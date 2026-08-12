<#
.SYNOPSIS
  Transmission Engine — Layer 6 generation dispatcher (Replicate).
  Generates an image from a prompt and saves it to disk.

.DESCRIPTION
  Calls the Replicate HTTP API. Auth comes from $env:REPLICATE_API_TOKEN — NEVER pass the
  token as an argument and NEVER write it to a file. Uses `Prefer: wait` for a synchronous
  result, and falls back to polling if the model is still running.

  Model keys map to Replicate ids per models/registry.md:
    flux-pro (default) · flux-dev · recraft · imagen · ideogram

.EXAMPLE
  .\generate_image.ps1 -Prompt "two luminous presences, a permeable membrane of light..." `
                       -Out "C:\...\witnessing-without-merging\ground.png"

.EXAMPLE
  .\generate_image.ps1 -Prompt "..." -Out ".\ground.png" -Model flux-dev -Aspect "16:9" -Seed 7
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory)] [string]$Prompt,
  [Parameter(Mandatory)] [string]$Out,
  [ValidateSet('flux-pro','flux-dev','recraft','imagen','ideogram')]
  [string]$Model = 'flux-pro',
  [string]$Aspect = '16:9',
  [int]$Seed,
  [int]$TimeoutSec = 180,
  [double]$Cap = 20.00
)

$ErrorActionPreference = 'Stop'

# --- auth ---------------------------------------------------------------
$token = $env:REPLICATE_API_TOKEN
if ([string]::IsNullOrWhiteSpace($token)) {
  Write-Error @"
REPLICATE_API_TOKEN is not set in this environment.
Set it (PowerShell, persistent for new shells):
    setx REPLICATE_API_TOKEN "r8_your_token_here"
then open a NEW shell. Get a token at https://replicate.com/account/api-tokens
"@
  exit 2
}

# --- model map ----------------------------------------------------------
$ids = @{
  'flux-pro'  = 'black-forest-labs/flux-1.1-pro'
  'flux-dev'  = 'black-forest-labs/flux-dev'
  'recraft'   = 'recraft-ai/recraft-v3-svg'
  'imagen'    = 'google/imagen-4'
  'ideogram'  = 'ideogram-ai/ideogram-v3-turbo'
}
$modelId = $ids[$Model]

# --- COST BRAKE (Kevin's $20 cap; manual auth still required per call) ---
$costs = @{ 'flux-pro'=0.04; 'flux-dev'=0.003; 'recraft'=0.04; 'imagen'=0.04; 'ideogram'=0.01 }
$thisCost = [double]$costs[$Model]
$ledger = Join-Path $PSScriptRoot '..\.spend_ledger.csv'
$prior = 0.0
if (Test-Path $ledger) {
  $prior = (Import-Csv $ledger | ForEach-Object { [double]$_.cost } | Measure-Object -Sum).Sum
  if (-not $prior) { $prior = 0.0 }
}
if (($prior + $thisCost) -gt $Cap) {
  Write-Error ("COST BRAKE: this $Model call (~`$$thisCost) would bring total to `$$([math]::Round($prior+$thisCost,3)), over the `$$Cap cap. Aborting. Raise -Cap or trim .spend_ledger.csv to proceed.")
  exit 3
}

# --- input payload (per-model param differences) ------------------------
$input = @{ prompt = $Prompt }
switch ($Model) {
  'recraft' { $input.size = '1820x1024' }          # recraft uses size, not aspect_ratio
  default   { $input.aspect_ratio = $Aspect; $input.output_format = 'png' }
}
if ($PSBoundParameters.ContainsKey('Seed')) { $input.seed = $Seed }

$body = @{ input = $input } | ConvertTo-Json -Depth 6

$headers = @{
  'Authorization' = "Bearer $token"
  'Content-Type'  = 'application/json'
  'Prefer'        = 'wait'
}
$predUrl = "https://api.replicate.com/v1/models/$modelId/predictions"

Write-Host "-> $Model ($modelId) | aspect $Aspect" -ForegroundColor Cyan
try {
  $pred = Invoke-RestMethod -Method Post -Uri $predUrl -Headers $headers -Body $body -TimeoutSec $TimeoutSec
} catch {
  Write-Error "Replicate request failed: $($_.Exception.Message)"
  if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message -ForegroundColor Red }
  exit 1
}

# --- poll if not finished synchronously --------------------------------
$deadline = (Get-Date).AddSeconds($TimeoutSec)
while ($pred.status -in @('starting','processing') -and (Get-Date) -lt $deadline) {
  Start-Sleep -Seconds 2
  $pred = Invoke-RestMethod -Method Get -Uri $pred.urls.get -Headers $headers -TimeoutSec 30
}

if ($pred.status -ne 'succeeded') {
  Write-Error "Generation did not succeed (status: $($pred.status)). $($pred.error)"
  exit 1
}

# --- resolve output url (string | array | object) ----------------------
$output = $pred.output
$url = $null
if     ($output -is [string])  { $url = $output }
elseif ($output -is [array])   { $url = $output[0] }
elseif ($output.url)           { $url = $output.url }
if ([string]::IsNullOrWhiteSpace($url)) {
  Write-Error "Succeeded but no output URL found. Raw output: $($output | ConvertTo-Json -Depth 4)"
  exit 1
}

# --- download ----------------------------------------------------------
$dir = Split-Path -Parent $Out
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
Invoke-WebRequest -Uri $url -OutFile $Out -TimeoutSec 120

$seedUsed = if ($pred.input.seed) { $pred.input.seed } else { '(model-chosen)' }
Write-Host "OK saved $Out" -ForegroundColor Green
Write-Host "  seed: $seedUsed | predict id: $($pred.id)" -ForegroundColor DarkGray

# --- append to spend ledger + report running total ---------------------
$entry = [pscustomobject]@{ when=(Get-Date -Format 's'); model=$Model; cost=$thisCost; id=$pred.id }
if (Test-Path $ledger) { $entry | Export-Csv $ledger -NoTypeInformation -Append }
else { $entry | Export-Csv $ledger -NoTypeInformation }
$total = (Import-Csv $ledger | ForEach-Object { [double]$_.cost } | Measure-Object -Sum).Sum
Write-Host ("  spend: `$$thisCost this call | total `$$([math]::Round($total,3)) / `$$Cap cap") -ForegroundColor DarkGray
[pscustomobject]@{ out = $Out; url = $url; seed = $seedUsed; id = $pred.id }

# verify_fonts.ps1
# Checks whether the engine's required typefaces are installed on this Windows machine.
# Returns 0 if all present, 1 if any missing. Prints a clear report either way.
#
# Usage:
#   .\verify_fonts.ps1
#   .\verify_fonts.ps1 -Quiet    (only output if something is missing)

[CmdletBinding()]
param(
    [switch]$Quiet
)

# Fonts the engine's SVG templates call by name
$required = @(
    @{ Family = 'Cormorant Garamond'; Used = 'Headings (serif primary)'; Source = 'https://fonts.google.com/specimen/Cormorant+Garamond' },
    @{ Family = 'Cinzel';             Used = 'Display headings (alternate)';   Source = 'https://fonts.google.com/specimen/Cinzel' },
    @{ Family = 'Inter';              Used = 'Labels (sans-serif)';            Source = 'https://fonts.google.com/specimen/Inter' }
)

Add-Type -AssemblyName System.Drawing
$installedFamilies = (New-Object System.Drawing.Text.InstalledFontCollection).Families | ForEach-Object { $_.Name }

$missing = @()
$present = @()

foreach ($f in $required) {
    if ($installedFamilies -contains $f.Family) {
        $present += $f
    } else {
        $missing += $f
    }
}

if (-not $Quiet) {
    Write-Host ""
    Write-Host "Font verification -- transmission-engine"
    Write-Host "----------------------------------------"
    foreach ($f in $present) {
        Write-Host ("  [OK]  {0,-22} {1}" -f $f.Family, $f.Used)
    }
}

if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Host "MISSING fonts (rasterized output will fall back to system defaults):"
    foreach ($f in $missing) {
        Write-Host ""
        Write-Host ("  [--]  {0}" -f $f.Family)
        Write-Host ("        Used for: {0}" -f $f.Used)
        Write-Host ("        Download: {0}" -f $f.Source)
    }
    Write-Host ""
    Write-Host "To install on Windows: download the .zip, extract, select all .ttf files,"
    Write-Host "right-click -> Install for all users."
    Write-Host ""
    exit 1
}

if (-not $Quiet) {
    Write-Host ""
    Write-Host "All required fonts present."
    Write-Host ""
}
exit 0

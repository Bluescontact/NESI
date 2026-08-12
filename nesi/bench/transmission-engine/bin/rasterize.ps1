# rasterize.ps1
# Detects the best available SVG rasterizer on this machine and converts SVG to PNG.
# Usage:
#   .\rasterize.ps1 -InputSvg path\to\pattern.svg
#   .\rasterize.ps1 -InputSvg path\to\pattern.svg -Dpi 300
#   .\rasterize.ps1 -InputSvg path\to\pattern.svg -SocialVariants
#
# Output: <input>.png next to the source. With -SocialVariants, also produces:
#   <input>.square.png   (1080x1080, for IG/LinkedIn)
#   <input>.card.png     (1200x675, for X/Twitter cards)
#
# GOTCHA — ImageMagick and the SVG <use> element:
#   On this machine the only installed backend is ImageMagick (magick). Its SVG
#   renderer SILENTLY does not support <use>: any geometry defined once (e.g.
#   <g id="tetra">) and instanced via <use href="#tetra"> is dropped from the
#   PNG entirely — it renders blank, with no error. Inkscape and rsvg-convert
#   handle <use> correctly, so if either is ever installed this stops mattering;
#   until then, generated SVGs must INLINE repeated geometry rather than
#   referencing it. Note: fill="url(#gradient)" and filter="url(#id)" references
#   DO work in magick — only <use> cross-references fail. <g transform=...> with
#   literal inlined children works fine. (See SKILL.md Stage 2.)

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$InputSvg,

    [int]$Dpi = 200,

    [int]$Width = 1600,

    [int]$Height = 900,

    [switch]$SocialVariants
)

# --- Resolve input ---
if (-not (Test-Path $InputSvg)) {
    Write-Error "Input SVG not found: $InputSvg"
    exit 1
}
$InputSvg = (Resolve-Path $InputSvg).Path
$baseDir = Split-Path $InputSvg -Parent
$baseName = [System.IO.Path]::GetFileNameWithoutExtension($InputSvg)
$outputPng = Join-Path $baseDir "$baseName.png"

# --- Detect available rasterizers, in priority order ---
# Tries PATH first, then falls back to known Windows install locations
# (handles the case where install completed but the current shell's PATH
# is stale).
function Find-Tool($name, $fallbackGlobs) {
    $cmd = Get-Command $name -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    foreach ($g in $fallbackGlobs) {
        $hit = Get-Item $g -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($hit) { return $hit.FullName }
    }
    return $null
}

$inkscape = Find-Tool 'inkscape' @(
    'C:\Program Files\Inkscape\bin\inkscape.exe',
    'C:\Program Files (x86)\Inkscape\bin\inkscape.exe'
)
$magick = Find-Tool 'magick' @(
    'C:\Program Files\ImageMagick-*\magick.exe',
    'C:\Program Files (x86)\ImageMagick-*\magick.exe'
)
$rsvg = Find-Tool 'rsvg-convert' @()

# --- Render function with selected backend ---
function Render-Svg($src, $dst, $w, $h) {
    if ($inkscape) {
        Write-Host "[rasterize] inkscape -> $dst ($($w)x$($h))"
        & $inkscape --export-type=png --export-filename="$dst" --export-width=$w --export-height=$h "$src" 2>$null
        return $?
    }
    if ($magick) {
        Write-Host "[rasterize] magick -> $dst ($($w)x$($h))"
        & $magick -density $Dpi -background none "$src" -resize "${w}x${h}" "$dst"
        return $?
    }
    if ($rsvg) {
        Write-Host "[rasterize] rsvg-convert -> $dst ($($w)x$($h))"
        & $rsvg -w $w -h $h -o "$dst" "$src"
        return $?
    }
    Write-Warning "No SVG rasterizer found. Install one of:"
    Write-Warning "  Inkscape:    https://inkscape.org/release/"
    Write-Warning "  ImageMagick: https://imagemagick.org/script/download.php#windows"
    Write-Warning "  rsvg-convert (via librsvg)"
    Write-Warning "Falling back: open '$src' in a browser, right-click image, Save As PNG."
    return $false
}

# --- Primary render ---
$ok = Render-Svg $InputSvg $outputPng $Width $Height
if (-not $ok) { exit 2 }
Write-Host "[rasterize] wrote $outputPng"

# --- Social variants ---
if ($SocialVariants) {
    $squarePng = Join-Path $baseDir "$baseName.square.png"
    $cardPng   = Join-Path $baseDir "$baseName.card.png"
    Render-Svg $InputSvg $squarePng 1080 1080 | Out-Null
    Render-Svg $InputSvg $cardPng   1200 675  | Out-Null
    Write-Host "[rasterize] social variants written"
}

Write-Host "[rasterize] done."

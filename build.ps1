<#
.SYNOPSIS
    Build script pro portfolio - spojuje HTML sekce do index.html

.DESCRIPTION
    Tento script načte všechny HTML soubory ze složky src/sections/ 
    a spojí je do jednoho souboru index.html

.EXAMPLE
    .\build.ps1
#>

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$sectionsDir = Join-Path $scriptDir "src\sections"
$outputFile = Join-Path $scriptDir "index.html"

Write-Host "`n🚀 Portfolio Build`n" -ForegroundColor Cyan
Write-Host ("=" * 40)
Write-Host "`n📦 Spojuji sekce...`n" -ForegroundColor Yellow

# Získej všechny HTML soubory seřazené podle čísla
$sectionFiles = Get-ChildItem -Path $sectionsDir -Filter "*.html" | 
    Sort-Object { [int]($_.Name -split '-')[0] }

if ($sectionFiles.Count -eq 0) {
    Write-Host "❌ Nenalezeny žádné sekce v $sectionsDir" -ForegroundColor Red
    exit 1
}

# Záloha původního souboru
if (Test-Path $outputFile) {
    $backupFile = $outputFile -replace '\.html$', '.backup.html'
    Copy-Item $outputFile $backupFile -Force
    Write-Host "📋 Záloha: index.backup.html" -ForegroundColor Gray
}

# Spojení sekcí
$html = @()

foreach ($file in $sectionFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $html += $content
    Write-Host "  ✅ $($file.Name)" -ForegroundColor Green
}

# Zápis výsledku
$result = $html -join "`n"
[System.IO.File]::WriteAllText($outputFile, $result, [System.Text.Encoding]::UTF8)

# Statistiky
$fileSize = (Get-Item $outputFile).Length / 1KB

Write-Host "`n$("=" * 40)"
Write-Host "✨ Hotovo! Výstup: index.html" -ForegroundColor Green
Write-Host "📊 Velikost: $([math]::Round($fileSize, 2)) KB" -ForegroundColor Cyan
Write-Host ""

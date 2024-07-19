$sourcePath = "./env"
$destinationPath = "./env"

Get-ChildItem -Path $sourcePath -Filter "*.env.example" -Recurse | ForEach-Object {
    $sourceFile = $_.FullName
    $destinationFile = Join-Path -Path $destinationPath -ChildPath ($_.Name -replace "\.env.example$", ".env")

    Copy-Item -Path $sourceFile -Destination $destinationFile -Force
    Write-Host "Copied $sourceFile to $destinationFile"
}
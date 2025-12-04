# Admin API Startup Script
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Starting Admin API Service" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if port 6060 is in use
$port = 6060
$processId = (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue).OwningProcess | Select-Object -First 1

if ($processId) {
    Write-Host "Port $port is in use by process $processId" -ForegroundColor Yellow
    $response = Read-Host "Kill the process and continue? (y/n)"
    if ($response -eq 'y') {
        Stop-Process -Id $processId -Force
        Write-Host "Process killed" -ForegroundColor Green
        Start-Sleep -Seconds 2
    } else {
        Write-Host "Startup cancelled" -ForegroundColor Red
        exit 1
    }
}

# Check environment variables
if (-not (Test-Path .env)) {
    Write-Host "ERROR: .env file not found!" -ForegroundColor Red
    Write-Host "Please create .env file with required variables" -ForegroundColor Yellow
    exit 1
}

# Start the API
Write-Host "Starting API on port 6060..." -ForegroundColor Green
npm run dev

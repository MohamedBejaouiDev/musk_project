# Admin Panel Startup Script
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Starting Admin Panel" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if port 5174 is in use
$port = 5174
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

# Start the admin panel
Write-Host "Starting admin panel on port 5174..." -ForegroundColor Green
npm run dev

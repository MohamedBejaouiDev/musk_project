# Admin System Startup
# Starts both the Admin API and Admin Panel

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PERFUME SHOP - ADMIN SYSTEM STARTUP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Stop"

# Function to kill process on port
function Kill-PortProcess {
    param($port)
    $processId = (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue).OwningProcess | Select-Object -First 1
    if ($processId) {
        Write-Host "Killing process $processId on port $port..." -ForegroundColor Yellow
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 1
        return $true
    }
    return $false
}

# Clean up ports
Write-Host "Step 1: Cleaning up ports..." -ForegroundColor Yellow
Kill-PortProcess 6060 | Out-Null
Kill-PortProcess 5174 | Out-Null
Kill-PortProcess 5175 | Out-Null
Write-Host "Ports cleaned!" -ForegroundColor Green
Write-Host ""

# Check Admin API environment
Write-Host "Step 2: Checking Admin API..." -ForegroundColor Yellow
if (-not (Test-Path "product-crud-service\.env")) {
    Write-Host "ERROR: product-crud-service\.env not found!" -ForegroundColor Red
    exit 1
}
Write-Host "Admin API config OK!" -ForegroundColor Green
Write-Host ""

# Check Admin Panel environment
Write-Host "Step 3: Checking Admin Panel..." -ForegroundColor Yellow
if (-not (Test-Path "admin-panel\.env")) {
    Write-Host "ERROR: admin-panel\.env not found!" -ForegroundColor Red
    exit 1
}
Write-Host "Admin Panel config OK!" -ForegroundColor Green
Write-Host ""

# Start Admin API in background
Write-Host "Step 4: Starting Admin API (port 6060)..." -ForegroundColor Yellow
$currentPath = Get-Location
$apiPath = Join-Path $currentPath "product-crud-service"
$apiJob = Start-Job -ScriptBlock {
    param($path)
    Set-Location $path
    npm run dev
} -ArgumentList $apiPath

Start-Sleep -Seconds 3

# Check if API started
$apiPort = Get-NetTCPConnection -LocalPort 6060 -ErrorAction SilentlyContinue
if ($apiPort) {
    Write-Host "Admin API started successfully!" -ForegroundColor Green
} else {
    Write-Host "WARNING: Admin API may not have started" -ForegroundColor Yellow
}
Write-Host ""

# Start Admin Panel
Write-Host "Step 5: Starting Admin Panel (port 5174)..." -ForegroundColor Yellow
Set-Location "admin-panel"
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ADMIN PANEL READY" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Admin Panel: http://localhost:5174" -ForegroundColor Cyan
Write-Host "  Admin API:   http://localhost:6060" -ForegroundColor Cyan
Write-Host "  Login:       admin@admin.com / 123456789" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

npm run dev

# Cleanup on exit
Remove-Job -Job $apiJob -Force -ErrorAction SilentlyContinue

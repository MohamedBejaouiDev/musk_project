# Start all three servers (main, admin, backend) in separate terminals
# Run from project root: .\start-all.ps1

$rootPath = Get-Location

# Terminal 1: Main Website
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$rootPath\frontends\main'; npm run dev`""

# Terminal 2: Admin Panel (with slight delay)
Start-Sleep -Milliseconds 500
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$rootPath\frontends\admin'; npm run dev`""

# Terminal 3: Backend API (with slight delay)
Start-Sleep -Milliseconds 500
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$rootPath\backends\api'; npm run dev`""

Write-Host "`n✅ All servers started in separate terminals!"
Write-Host "`n📍 Access points:"
Write-Host "   Main Website: http://localhost:5173"
Write-Host "   Admin Panel:  http://localhost:5174"
Write-Host "   Backend API:  http://localhost:6060"

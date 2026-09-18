@echo off
echo =======================================================
echo   BEACON - AI Support Intelligence & Cyber Defense
echo =======================================================
echo.
echo Starting Beacon Full-Stack Platform...
start cmd /k "python -m uvicorn backend.main:app --port 8000 --host 127.0.0.1"

echo.
echo Opening Beacon Executive Dashboard at http://localhost:8000...
timeout /t 2 >nul
start http://localhost:8000
echo Beacon is live!

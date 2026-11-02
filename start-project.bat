@echo off
title Campus Marketplace Launcher
echo ========================================================
echo Starting Campus Marketplace (Backend + Frontend)
echo ========================================================

echo [1/2] Starting Spring Boot Backend (Port 8081)...
start "Campus Marketplace - Backend" cmd /k "cd /d %~dp0campusmarketplace && mvnw.cmd spring-boot:run"

echo [2/2] Starting React Frontend (Port 5173)...
start "Campus Marketplace - Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Services are launching!
echo - Backend API:  http://localhost:8081
echo - Frontend Web: http://localhost:5173
echo.
echo Leave the opened terminal windows open while using the app.
echo ========================================================
pause

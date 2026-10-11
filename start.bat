@echo off
title ScreenCraft Local Dev Server
echo ==============================================
echo   ScreenCraft Studio - Starting Dev Server
echo   No Python or Node.js required!
echo ==============================================
echo.
echo Running server on http://localhost:5000 ...
start http://localhost:5000
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port 5000
pause

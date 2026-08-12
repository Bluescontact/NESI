@echo off
title NESI
cd /d "%~dp0"
python "%~dp0conductor\surface_app.py"
if errorlevel 1 pause

@echo off
title NESI
cd /d "%~dp0"
python "%~dp0nesi_v2.py"
if errorlevel 1 pause

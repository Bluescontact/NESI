@echo off
title NESI — your boundary
cd /d "%~dp0"
python "%~dp0boundary_server.py"
if errorlevel 1 pause

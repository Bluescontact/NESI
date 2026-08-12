@echo off
title NESI - already built, or new?
cd /d "%~dp0"
python "%~dp0conductor\check_idea.py"
if errorlevel 1 pause
pause

@echo off
rem PLACE STONES - copies the newest downloaded stones.json into the 3D world.
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py place_stones.py
) else (
  python place_stones.py
)
pause

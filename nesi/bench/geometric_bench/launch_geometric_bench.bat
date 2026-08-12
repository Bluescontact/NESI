@echo off
cd /d "%~dp0"
python bench_geo.py
if errorlevel 1 (
  echo.
  echo bench_geo.py exited with an error - see above.
  pause
)

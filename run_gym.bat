@echo off
cd /d "h:\GYM project"
echo Starting Iron Forge Gym Server...
start /min cmd /c "npm run dev"
timeout /t 3 /nobreak > nul
echo Opening website in browser...
start http://localhost:3000
exit

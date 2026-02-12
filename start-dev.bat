@echo off
echo Starting MarkGadzhi AI Full Stack Environment...

:: Start Backend
start "MarkGadzhi API" cmd /k "cd server && npm install && npm start"

:: Start Frontend
start "MarkGadzhi Frontend" cmd /k "npm install && npm run dev"

echo Systems Initialized.
echo API running on port 3000
echo Frontend running on port 5173
pause

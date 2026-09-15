@echo off
REM Script de test local pour Windows

echo.
echo Test NourTransport en local
echo ===============================
echo.

if not exist "node_modules" (
    echo Installation des dependances...
    call npm install
)

echo.
echo Demarrage du serveur local...
echo Ouvrez votre navigateur: http://localhost:3000
echo.
echo Pour arreter: Ctrl + C
echo.

call npm start

pause

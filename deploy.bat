@echo off
REM Script de configuration et déploiement Vercel pour Windows

echo.
echo NourTransport - Configuration et Deployement
echo ================================================
echo.

REM Vérifier Node.js
for /f "tokens=*" %%i in ('node --version 2^>nul') do set NODE_VERSION=%%i
if "%NODE_VERSION%"==" " (
    echo Erreur: Node.js n'est pas installe. Veuillez installer Node.js
    pause
    exit /b 1
)

echo [OK] Node.js trouve: %NODE_VERSION%
echo.

REM Installer dépendances
echo Installation des dependances...
call npm install

echo [OK] Dependances installees
echo.

REM Vérifier/Installer Vercel CLI
for /f "tokens=*" %%i in ('vercel --version 2^>nul') do set VERCEL_VERSION=%%i
if "%VERCEL_VERSION%"==" " (
    echo Installation de Vercel CLI...
    call npm install -g vercel
)

echo [OK] Vercel CLI pret
echo.

echo Deployement sur Vercel en cours...
echo Suivez les instructions pour lier votre compte Vercel
echo.

call vercel --prod

echo.
echo [OK] Deployement termine!
echo [SUCCESS] Votre application est en ligne!
echo.

pause

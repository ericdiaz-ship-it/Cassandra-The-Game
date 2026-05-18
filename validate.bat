@echo off
REM CASSANDRA - Pre-deployment validation script for Windows
REM Run this before pushing to git or deploying to Vercel

cls
echo.
echo ========================================================
echo.   CASSANDRA - Pre-deployment Validation
echo.
echo ========================================================
echo.

setlocal enabledelayedexpansion
set errors=0
set warnings=0

REM ===== CHECK 1: .env file exists =====
echo Checking configuration files...
if exist ".env" (
    echo [OK] .env file exists
    
    for /f "tokens=*" %%a in ('type .env ^| find "GEMINI_KEY=" ^| findstr /v "your_"') do (
        if not "%%a"=="" (
            echo [OK] GEMINI_KEY is configured
            goto :check2
        )
    )
    echo [ERROR] GEMINI_KEY is not configured in .env
    set /a errors+=1
) else (
    echo [ERROR] .env file not found - copy from .env.example
    set /a errors+=1
)

:check2
REM ===== CHECK 2: Required files exist =====
echo.
echo Checking project structure...

for %%f in (
    "index.html"
    "chat.html"
    "mis_documentos.html"
    "config.js"
    "vercel.json"
    "package.json"
    "api\chat.js"
    "api\documents.js"
    "api\config.js"
) do (
    if exist %%f (
        echo [OK] Found: %%f
    ) else (
        echo [ERROR] Missing: %%f
        set /a errors+=1
    )
)

REM ===== CHECK 3: Documentos folder =====
echo.
echo Checking documents...
if exist "Documentos" (
    setlocal enabledelayedexpansion
    set count=0
    for /r "Documentos" %%f in (*.pdf) do set /a count+=1
    if !count! gtr 0 (
        echo [OK] Found !count! PDF files in Documentos/
    ) else (
        echo [WARNING] No PDF files found in Documentos/
        set /a warnings+=1
    )
) else (
    echo [WARNING] Documentos/ folder not found
    set /a warnings+=1
)

REM ===== CHECK 4: .gitignore check =====
echo.
echo Checking git configuration...
findstr /r "^\.env$" .gitignore > nul
if %errorlevel% equ 0 (
    echo [OK] .env is in .gitignore
) else (
    echo [ERROR] .env should be in .gitignore
    set /a errors+=1
)

REM ===== SUMMARY =====
echo.
echo ========================================================
if %errors% equ 0 (
    if %warnings% equ 0 (
        echo [SUCCESS] All checks passed! Ready to deploy
    ) else (
        echo [SUCCESS] All critical checks passed, review warnings
    )
) else (
    echo [ERROR] Fix errors before deployment
)
echo ========================================================
echo.
echo Summary:
echo   Errors:   %errors%
echo   Warnings: %warnings%
echo.

if %errors% gtr 0 (
    echo Next steps:
    echo   1. Fix the errors listed above
    echo   2. Run this script again to verify
    echo   3. Then run: git add . ^&^& git commit ^&^& git push
    pause
    exit /b 1
) else (
    echo Ready to deploy! Run:
    echo   git add .
    echo   git commit -m "CASSANDRA ready for Vercel"
    echo   git push
    pause
    exit /b 0
)

@echo off
echo ========================================
echo   GitHub Pages Deployment Helper
echo ========================================
echo.
echo This script will help you deploy your website to GitHub Pages.
echo.
echo BEFORE RUNNING THIS:
echo 1. Create a repository on GitHub: https://github.com/new
echo 2. Copy your repository URL
echo.
pause

echo.
echo Step 1: Initializing Git repository...
git init
if errorlevel 1 (
    echo ERROR: Git initialization failed!
    echo Make sure Git is installed: https://git-scm.com/downloads
    pause
    exit /b 1
)
echo ✓ Git initialized
echo.

echo Step 2: Adding all files...
git add .
echo ✓ Files added
echo.

echo Step 3: Creating initial commit...
git commit -m "Initial commit: Scroll animation website with high-quality frames"
if errorlevel 1 (
    echo ERROR: Commit failed!
    echo Configure Git first:
    echo   git config --global user.name "Your Name"
    echo   git config --global user.email "your.email@example.com"
    pause
    exit /b 1
)
echo ✓ Commit created
echo.

echo Step 4: Connect to GitHub repository
echo.
echo Please enter your GitHub repository URL:
echo (Example: https://github.com/username/repository-name.git)
echo.
set /p REPO_URL=Enter URL: 

git remote add origin %REPO_URL%
if errorlevel 1 (
    echo.
    echo ERROR: Could not add remote. It might already exist.
    echo Trying to update existing remote...
    git remote set-url origin %REPO_URL%
)
echo ✓ Remote connected
echo.

echo Step 5: Renaming branch to main...
git branch -M main
echo ✓ Branch renamed
echo.

echo Step 6: Pushing to GitHub...
echo (You may be prompted for credentials)
git push -u origin main
if errorlevel 1 (
    echo.
    echo ERROR: Push failed!
    echo.
    echo Common solutions:
    echo 1. Use Personal Access Token instead of password
    echo    Generate at: https://github.com/settings/tokens
    echo.
    echo 2. If using 2FA, you MUST use a Personal Access Token
    echo.
    pause
    exit /b 1
)
echo.
echo ========================================
echo   ✓ SUCCESS! Files pushed to GitHub!
echo ========================================
echo.
echo NEXT STEP: Enable GitHub Pages
echo.
echo 1. Go to your repository on GitHub
echo 2. Click "Settings" tab
echo 3. Click "Pages" in left sidebar
echo 4. Select: Branch = main, Folder = / (root)
echo 5. Click "Save"
echo 6. Wait 2-3 minutes
echo.
echo Your site will be live at:
echo https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
echo.
echo ========================================
echo.
pause

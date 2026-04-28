# 🚀 GitHub Pages Deployment Guide

This guide will walk you through deploying your scroll animation website to GitHub Pages for free hosting.

---

## 📋 Prerequisites

- Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- A GitHub account ([Sign up](https://github.com/join))
- Your website files ready

---

## 🎯 Step-by-Step Deployment

### Step 1: Create a GitHub Repository

1. **Go to GitHub**: https://github.com/new
2. **Repository name**: `scroll-animation` (or any name you prefer)
3. **Description**: "Scroll-driven video animation experience"
4. **Visibility**: Choose Public (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Step 2: Prepare Your Files

Create a `.gitignore` file in your project directory to exclude unnecessary files:

```
# Python
__pycache__/
*.py[cod]
*.pyo
Frames_backup/

# OS Files
.DS_Store
Thumbs.db
desktop.ini

# Video Files (too large for Git)
*.mp4
*.avi
*.mov
*.mkv

# Reports (optional)
extraction-report.txt
```

### Step 3: Initialize Git Repository

Open PowerShell/Command Prompt in your project folder:

```powershell
cd d:\Downloads\Website
```

Initialize Git:
```bash
git init
```

### Step 4: Add Your Files

Add all files to Git:
```bash
git add .
```

Check what will be committed:
```bash
git status
```

### Step 5: Commit Your Files

Create your first commit:
```bash
git commit -m "Initial commit: Scroll animation with high-quality video frames"
```

### Step 6: Connect to GitHub Repository

Copy the repository URL from GitHub (created in Step 1), then run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/scroll-animation.git
```

### Step 7: Push to GitHub

Push your files to GitHub:
```bash
git branch -M main
git push -u origin main
```

**If prompted for credentials:**
- Use your GitHub username
- Use a Personal Access Token (PAT) instead of password
  - Generate one at: https://github.com/settings/tokens
  - Select `repo` scope
  - Use the token as your password

### Step 8: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. Click **"Settings"** tab
3. Scroll down and click **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **"Save"**

### Step 9: Wait for Deployment

- GitHub will build your site (usually takes 1-3 minutes)
- You'll see a message: "Your site is published at..."
- Your live URL will be: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Step 10: Test Your Live Site

1. Click the provided URL
2. Verify the animation works correctly
3. Test scrolling functionality
4. Check on mobile devices

---

## 🔧 Troubleshooting

### Issue: 404 Page Not Found

**Solution:**
- Wait 2-5 minutes after initial deployment
- Make sure you selected the correct branch in Pages settings
- Verify `index.html` is in the root directory (not in a subfolder)

### Issue: Frames Not Loading

**Solution:**
- Check that the `Frames/` folder was uploaded
- Verify frame naming: `ezgif-frame-001.jpg`, `ezgif-frame-002.jpg`, etc.
- Open browser console (F12) to check for 404 errors

### Issue: Git Push Fails

**Solution:**
```bash
# If you get authentication errors:
git config --global credential.helper cache

# Then try pushing again:
git push -u origin main
```

### Issue: Repository Already Exists

**Solution:**
```bash
# Pull first, then push:
git pull origin main --allow-unrelated-histories
git push origin main
```

---

## 📊 File Size Management

### Important: GitHub has file size limits!

- **Maximum file size**: 100 MB per file
- **Recommended**: Keep total repository under 1 GB

### Your Current Frame Files:

```
145 frames × 73.2 KB avg = ~10.4 MB total
```

✅ **This is well within GitHub's limits!**

### If You Need to Reduce Size:

Modify `extract_frames.py` to lower quality:
```python
QUALITY = 85  # Instead of 98 (still good quality, smaller files)
```

Then re-extract:
```bash
python extract_frames.py
```

---

## 🔄 Updating Your Site

After making changes:

```bash
# 1. Check modified files
git status

# 2. Add changes
git add .

# 3. Commit with message
git commit -m "Updated animation frames"

# 4. Push to GitHub
git push origin main
```

GitHub Pages will automatically rebuild your site (1-2 minutes).

---

## 🎨 Custom Domain (Optional)

### Using Your Own Domain:

1. **Go to repository Settings → Pages**
2. Under **"Custom domain"**, enter your domain
3. Click **"Save"**
4. **Add CNAME file** to your repository root:
   ```
   yourdomain.com
   ```
5. **Configure DNS** at your domain registrar:
   - CNAME record: `www` → `YOUR_USERNAME.github.io`
   - A records: Point to GitHub's IPs
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

---

## 📱 Performance Tips for Production

### 1. Enable Compression
GitHub Pages automatically serves files with gzip compression.

### 2. Optimize Images Further (if needed)
```bash
# Install image optimization tool
pip install pillow

# Create optimization script
python -c "
from PIL import Image
import os

for i in range(1, 146):
    filename = f'Frames/ezgif-frame-{i:03d}.jpg'
    if os.path.exists(filename):
        img = Image.open(filename)
        img.save(filename, 'JPEG', quality=90, optimize=True)
"
```

### 3. Lazy Loading
The current implementation already uses batch loading, which is optimal.

---

## 🔒 Security Notes

- GitHub Pages sites are **public by default**
- Don't include sensitive information in your code
- Video files are excluded via `.gitignore` (too large for Git)
- All assets are client-side (no server-side code)

---

## 📈 Analytics (Optional)

Add Google Analytics or other tracking by inserting the script in `index.html`:

```html
<!-- Add before </head> -->
<!-- Google Analytics or other tracking code -->
```

---

## ✅ Deployment Checklist

- [ ] Created GitHub repository
- [ ] Initialized Git locally
- [ ] Added all files (including `Frames/` folder)
- [ ] Committed with meaningful message
- [ ] Connected to remote repository
- [ ] Pushed to GitHub
- [ ] Enabled GitHub Pages in Settings
- [ ] Verified site is live
- [ ] Tested on multiple devices
- [ ] All frames loading correctly
- [ ] Animation working smoothly

---

## 🎉 Success!

Once deployed, you can share your live URL:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**Example:**
```
https://johndoe.github.io/scroll-animation/
```

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [GitHub Desktop (GUI alternative)](https://desktop.github.com/)
- [Pages Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

**Need Help?** Open an issue on the repository or contact GitHub Support!

# 🎬 Scroll-Driven Video Animation Experience

An immersive, scroll-driven video animation experience that transforms video frames into a cinematic storytelling interface. Built with vanilla HTML, CSS, and JavaScript — zero dependencies, maximum performance.

![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Performance](https://img.shields.io/badge/Performance-60fps-orange)

## ✨ Features

- **🎥 Video Frame Extraction** — High-quality frames extracted directly from source video (98% JPEG quality)
- **🚀 Hardware-Accelerated Rendering** — GPU-optimized canvas with device pixel ratio support
- **🎨 Frame Interpolation** — Smooth transitions between frames using advanced blending algorithms
- **📱 Responsive Design** — Works seamlessly across desktop, tablet, and mobile devices
- **⚡ Zero Dependencies** — Pure HTML, CSS, and vanilla JavaScript
- **🎭 Cinematic UI** — Apple-inspired design with smooth animations and transitions
- **💾 Intelligent Caching** — Async image loading with batch processing and bitmap caching
- **🔍 Image Enhancement** — Real-time sharpening and contrast optimization

## 🎯 Live Demo

**[View Live Demo](https://yourusername.github.io/repository-name/)**

*(Replace with your actual GitHub Pages URL after deployment)*

## 📸 Preview

The animation features:
- Full-screen scroll-driven video playback
- Real-time frame counter and progress bar
- Smooth text overlays with fade-in effects
- Hardware-accelerated canvas rendering
- High-quality frame interpolation

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| HTML5 Canvas | Frame rendering with DPR support |
| CSS3 | Hardware acceleration & animations |
| Vanilla JavaScript | Frame interpolation & scroll handling |
| OpenCV (Python) | High-quality video frame extraction |
| ImageBitmap API | Async image decoding |

## 📦 Project Structure

```
Website/
├── index.html              # Main HTML file with embedded styles
├── frame-animator.js       # Advanced frame interpolation engine
├── image-enhancer.js       # Image quality enhancement utility
├── styles-enhanced.css     # Enhanced CSS optimizations
├── extract_frames.py       # Python script for video frame extraction
├── extraction-report.txt   # Frame extraction summary report
├── Frames/                 # High-quality extracted frames (145 frames)
│   ├── ezgif-frame-001.jpg
│   ├── ezgif-frame-002.jpg
│   └── ... (145 frames total)
└── README.md               # This file
```

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended - Free Hosting)

See the [Deployment Guide](#deployment-to-github-pages) below for detailed instructions.

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/repository-name.git
   cd repository-name
   ```

2. **Run a local server**
   
   Using Python:
   ```bash
   python -m http.server 8080
   ```
   
   Or using Node.js:
   ```bash
   npx http-server -p 8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

## 🔧 Customization

### Using Your Own Video

1. **Place your video file** in the project directory
2. **Update the extraction script** (`extract_frames.py`):
   ```python
   VIDEO_FILE = "your-video-file.mp4"
   QUALITY = 98  # 1-100, higher is better
   ```

3. **Run the extraction script**:
   ```bash
   pip install opencv-python
   python extract_frames.py
   ```

4. **Update frame count** in `index.html`:
   ```javascript
   const TOTAL_FRAMES = 145; // Change to your frame count
   ```

### Adjusting Animation Speed

Modify the scroll section height in `index.html`:
```css
#scroll-section {
  height: 2610px; /* Increase for slower, decrease for faster */
}
```

### Customizing Text Overlays

Edit the HTML in `index.html`:
```html
<div id="hero-label">Your Custom Label</div>
<h1 id="hero-title">Your Custom Title</h1>
```

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| Frame Quality | 98% JPEG (73.2 KB avg) |
| Rendering | 60 FPS target |
| Device Pixel Ratio | Up to 2x (capped for performance) |
| Image Smoothing | High-quality bicubic |
| Loading Strategy | Batch async (10 frames/batch) |

## 🎨 Enhancement Features

### Frame Interpolation
- Smooth blending between adjacent frames
- Temporal smoothing to eliminate jitter
- 60fps animation loop with frame prediction

### Image Quality
- Real-time sharpening for better clarity
- Contrast enhancement
- High-quality bicubic interpolation
- DPR-aware canvas rendering

### CSS Optimizations
- Hardware acceleration via GPU transforms
- Responsive quality based on device pixel ratio
- Backdrop blur effects for UI elements
- Smooth scroll behavior

## 🔍 Browser Compatibility

| Browser | Status |
|---------|--------|
| Chrome/Edge | ✅ Full Support |
| Firefox | ✅ Full Support |
| Safari | ✅ Full Support |
| Mobile Safari | ✅ Full Support |
| Android Chrome | ✅ Full Support |

## 📝 Frame Extraction Details

The project includes a Python script (`extract_frames.py`) that:
- Extracts every frame from your video
- Saves at 98% JPEG quality (vs typical 60-70%)
- Applies JPEG optimization and progressive encoding
- Backs up existing frames automatically
- Provides detailed extraction reports

**Quality Comparison:**
- **Before**: 8.3 KB average (heavily compressed)
- **After**: 73.2 KB average (782% quality improvement!)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- Inspired by Apple's product page scroll animations
- Built with vanilla web technologies
- Frame extraction powered by OpenCV

## 📧 Contact

Have questions or suggestions? Feel free to:
- Open an issue on GitHub
- Submit a pull request
- Contact the repository owner

---

**Made with ❤️ using vanilla web technologies**

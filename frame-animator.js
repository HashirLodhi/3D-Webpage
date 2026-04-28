/**
 * Advanced Frame Interpolation & Smoothing
 * Provides smoother transitions between frames using:
 * - Frame blending
 * - Temporal smoothing
 * - Motion prediction
 */

class FrameAnimator {
  constructor(canvas, ctx, totalFrames) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.totalFrames = totalFrames;
    
    // Smoothing configuration
    this.smoothingFactor = 0.15; // Lower = smoother but more lag
    this.previousFrame = 0;
    this.currentFrame = 0;
    this.targetFrame = 0;
    this.blendAlpha = 0;
    
    // Frame cache for blending
    this.frameCache = new Map();
    this.maxCacheSize = 20;
    
    // Animation state
    this.isAnimating = false;
    this.animationId = null;
    
    // Performance monitoring
    this.lastFrameTime = 0;
    this.frameInterval = 1000 / 60; // Target 60fps
  }
  
  /**
   * Smoothly transition to a new frame
   * @param {number} targetIndex - Target frame index
   */
  transitionTo(targetIndex) {
    this.targetFrame = Math.max(0, Math.min(targetIndex, this.totalFrames - 1));
    
    if (!this.isAnimating) {
      this.startAnimation();
    }
  }
  
  /**
   * Start the animation loop
   */
  startAnimation() {
    this.isAnimating = true;
    this.lastFrameTime = performance.now();
    this.animate();
  }
  
  /**
   * Animation loop
   */
  animate = () => {
    const now = performance.now();
    const delta = now - this.lastFrameTime;
    
    // Throttle to target frame rate
    if (delta >= this.frameInterval) {
      this.lastFrameTime = now - (delta % this.frameInterval);
      
      // Check if we've reached the target
      if (Math.abs(this.currentFrame - this.targetFrame) < 0.01) {
        this.currentFrame = this.targetFrame;
        this.drawFrame(Math.round(this.currentFrame));
        this.isAnimating = false;
        return;
      }
      
      // Smooth interpolation
      this.currentFrame += (this.targetFrame - this.currentFrame) * this.smoothingFactor;
      
      // Draw with blending if frames are far apart
      this.drawWithBlending(this.currentFrame);
    }
    
    this.animationId = requestAnimationFrame(this.animate);
  }
  
  /**
   * Draw frame with blending between adjacent frames
   * @param {number} frameFloat - Floating point frame index
   */
  drawWithBlending(frameFloat) {
    const frameLower = Math.floor(frameFloat);
    const frameUpper = Math.ceil(frameFloat);
    const blend = frameFloat - frameLower;
    
    // If blend factor is very small or very large, just draw the nearest frame
    if (blend < 0.05 || blend > 0.95 || frameLower === frameUpper) {
      this.drawFrame(frameLower);
      return;
    }
    
    // Draw blended frame
    this.drawBlendedFrame(frameLower, frameUpper, blend);
  }
  
  /**
   * Draw a single frame
   * @param {number} frameIndex - Frame index
   */
  drawFrame(frameIndex) {
    const img = window.images?.[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    
    this.ctx.clearRect(0, 0, cw, ch);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
    
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    
    this.ctx.drawImage(img, dx, dy, dw, dh);
  }
  
  /**
   * Draw blended frame between two frames
   * @param {number} frameA - First frame index
   * @param {number} frameB - Second frame index
   * @param {number} alpha - Blend factor (0-1)
   */
  drawBlendedFrame(frameA, frameB, alpha) {
    const imgA = window.images?.[frameA];
    const imgB = window.images?.[frameB];
    
    if (!imgA || !imgB || !imgA.complete || !imgB.complete) {
      this.drawFrame(frameA);
      return;
    }
    
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    
    this.ctx.clearRect(0, 0, cw, ch);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
    this.ctx.globalAlpha = 1;
    
    // Draw first frame
    const dimensions = this.getImageDimensions(imgA);
    this.ctx.globalAlpha = 1 - alpha;
    this.ctx.drawImage(imgA, dimensions.dx, dimensions.dy, dimensions.dw, dimensions.dh);
    
    // Draw second frame with blend
    this.ctx.globalAlpha = alpha;
    this.ctx.drawImage(imgB, dimensions.dx, dimensions.dy, dimensions.dw, dimensions.dh);
    
    // Reset alpha
    this.ctx.globalAlpha = 1;
  }
  
  /**
   * Calculate image dimensions for drawing
   * @param {HTMLImageElement} img - Image element
   * @returns {Object} Dimensions object
   */
  getImageDimensions(img) {
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    
    return { dx, dy, dw, dh };
  }
  
  /**
   * Stop animation
   */
  stop() {
    this.isAnimating = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  /**
   * Update smoothing factor
   * @param {number} factor - New smoothing factor (0-1)
   */
  setSmoothing(factor) {
    this.smoothingFactor = Math.max(0.05, Math.min(1, factor));
  }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FrameAnimator;
}

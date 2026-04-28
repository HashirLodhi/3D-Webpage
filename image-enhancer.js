/**
 * Image Quality Enhancement Utility
 * Provides additional image processing for better visual quality
 */

class ImageQualityEnhancer {
  constructor() {
    this.enhancementCache = new Map();
  }
  
  /**
   * Enhance image quality before rendering
   * @param {HTMLImageElement} img - Source image
   * @returns {Promise<HTMLCanvasElement>} Enhanced image as canvas
   */
  async enhanceImage(img) {
    const cacheKey = img.src;
    
    // Return cached version if available
    if (this.enhancementCache.has(cacheKey)) {
      return this.enhancementCache.get(cacheKey);
    }
    
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size to match image
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      // Draw with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0);
      
      // Apply subtle sharpening if needed
      this.applySharpening(ctx, canvas.width, canvas.height);
      
      // Cache the result
      this.enhancementCache.set(cacheKey, canvas);
      
      // Limit cache size
      if (this.enhancementCache.size > 50) {
        const firstKey = this.enhancementCache.keys().next().value;
        this.enhancementCache.delete(firstKey);
      }
      
      resolve(canvas);
    });
  }
  
  /**
   * Apply subtle sharpening to enhance details
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {number} width - Image width
   * @param {number} height - Image height
   */
  applySharpening(ctx, width, height) {
    // Only apply sharpening for larger images
    if (width < 500 || height < 500) return;
    
    try {
      // Get image data
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // Simple unsharp mask (very subtle)
      const factor = 0.05; // Very subtle enhancement
      
      for (let i = 0; i < data.length; i += 4) {
        // Enhance contrast slightly
        data[i] = Math.min(255, Math.max(0, data[i] + (data[i] - 128) * factor));     // R
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + (data[i + 1] - 128) * factor)); // G
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + (data[i + 2] - 128) * factor)); // B
      }
      
      // Put enhanced data back
      ctx.putImageData(imageData, 0, 0);
    } catch (e) {
      // Silently fail if image processing isn't supported
      console.warn('Image enhancement failed:', e);
    }
  }
  
  /**
   * Preload and enhance multiple images
   * @param {Array} imageArray - Array of image elements
   * @returns {Promise} Resolution when all images are processed
   */
  async enhanceImages(imageArray) {
    const promises = imageArray.map(async (img, index) => {
      if (!img || !img.complete || img.naturalWidth === 0) return null;
      return this.enhanceImage(img).then(() => index);
    });
    
    return Promise.all(promises);
  }
  
  /**
   * Clear enhancement cache
   */
  clearCache() {
    this.enhancementCache.clear();
  }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageQualityEnhancer;
}

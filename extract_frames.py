"""
High-Quality Frame Extractor
Extracts frames from video with maximum quality settings
"""

import cv2
import os
from pathlib import Path
import shutil

def extract_frames_high_quality(video_path, output_folder, quality=95):
    """
    Extract frames from video with high quality settings
    
    Args:
        video_path: Path to the video file
        output_folder: Directory to save extracted frames
        quality: JPEG quality (1-100, higher is better)
    """
    
    # Create output directory
    output_path = Path(output_folder)
    
    # Backup old frames if they exist
    if output_path.exists():
        print(f"Backing up existing frames...")
        backup_path = Path(output_folder + "_backup")
        if backup_path.exists():
            shutil.rmtree(backup_path)
        shutil.move(output_path, backup_path)
        print(f"Old frames backed up to: {backup_path}")
    
    # Create fresh output directory
    output_path.mkdir(exist_ok=True)
    
    # Open video file
    print(f"Opening video: {video_path}")
    cap = cv2.VideoCapture(video_path)
    
    if not cap.isOpened():
        print("Error: Could not open video file")
        return
    
    # Get video properties
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    duration = total_frames / fps
    
    print(f"\nVideo Properties:")
    print(f"  Resolution: {width}x{height}")
    print(f"  FPS: {fps}")
    print(f"  Total Frames: {total_frames}")
    print(f"  Duration: {duration:.2f} seconds")
    print(f"  Output Quality: {quality}%")
    print(f"\nExtracting frames...")
    
    # Set high quality JPEG parameters
    jpeg_params = [cv2.IMWRITE_JPEG_QUALITY, quality,
                   cv2.IMWRITE_JPEG_OPTIMIZE, 1,
                   cv2.IMWRITE_JPEG_PROGRESSIVE, 1]
    
    frame_count = 0
    saved_count = 0
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # Increment frame counter
        frame_count += 1
        
        # Save frame with high quality
        frame_filename = output_path / f"ezgif-frame-{frame_count:03d}.jpg"
        cv2.imwrite(str(frame_filename), frame, jpeg_params)
        saved_count += 1
        
        # Progress indicator
        if frame_count % 10 == 0:
            progress = (frame_count / total_frames) * 100
            print(f"  Progress: {frame_count}/{total_frames} ({progress:.1f}%)")
    
    cap.release()
    
    print(f"\n✓ Extraction Complete!")
    print(f"  Frames extracted: {saved_count}")
    print(f"  Output directory: {output_path}")
    print(f"  Quality: {quality}%")
    
    # Show comparison
    old_backup = Path(output_folder + "_backup")
    if old_backup.exists():
        old_count = len(list(old_backup.glob("*.jpg")))
        print(f"\n  Previous frames: {old_count}")
        print(f"  New frames: {saved_count}")
        if saved_count > old_count:
            print(f"  ↑ {saved_count - old_count} more frames extracted")
        elif saved_count < old_count:
            print(f"  ↓ {old_count - saved_count} fewer frames")
        else:
            print(f"  = Same number of frames")

if __name__ == "__main__":
    # Configuration
    VIDEO_FILE = "WhatsApp Video 2026-04-22 at 7.53.57 PM.mp4"
    OUTPUT_FOLDER = "Frames"
    QUALITY = 98  # Very high quality (1-100)
    
    # Check if video exists
    if not os.path.exists(VIDEO_FILE):
        print(f"Error: Video file not found: {VIDEO_FILE}")
        exit(1)
    
    # Extract frames
    extract_frames_high_quality(VIDEO_FILE, OUTPUT_FOLDER, QUALITY)

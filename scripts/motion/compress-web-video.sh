#!/usr/bin/env bash
set -eu

# ============================================================
# RAE Motion Pipeline — Web Video Compressor
# RC4.4 Motion Asset Workspace
#
# Encodes a source video to web-safe H.264 MP4 with no audio.
#
# Usage:
#   rtk bash scripts/motion/compress-web-video.sh <input> <output>
#
# Example:
#   rtk bash scripts/motion/compress-web-video.sh \
#     "F:/ProjectAI/rae-motion-lab/generated/motion/rae-hero-motion-v1-20260614.mp4" \
#     "F:/ProjectAI/rae-motion-lab/compressed/rae-hero-motion-v1-20260614.mp4"
# ============================================================

INPUT="${1:-}"
OUTPUT="${2:-}"

# --------------------------------------------------
# Validation
# --------------------------------------------------
if [ -z "$INPUT" ] || [ -z "$OUTPUT" ]; then
  echo "ERROR: Missing arguments."
  echo "Usage: $0 <input> <output>"
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "ERROR: Input file not found: $INPUT"
  exit 1
fi

if [ -f "$OUTPUT" ]; then
  echo "ERROR: Output file already exists: $OUTPUT"
  echo "  Remove it first or specify a different output path."
  exit 1
fi

# --------------------------------------------------
# Source metadata (informational)
# --------------------------------------------------
echo "=== Source Info ==="
ffprobe -v error -show_entries format=duration,size -show_entries stream=width,height,r_frame_rate -of default=noprint_wrappers=1 "$INPUT" 2>/dev/null || true

# --------------------------------------------------
# Encode
# --------------------------------------------------
echo ""
echo "=== Encoding ==="

ffmpeg \
  -i "$INPUT" \
  -c:v libx264 \
  -pix_fmt yuv420p \
  -crf 26 \
  -preset slow \
  -vf "scale='min(1920,iw)':min'(1080,ih)':force_original_aspect_ratio=decrease" \
  -an \
  -movflags +faststart \
  -y \
  "$OUTPUT"

# --------------------------------------------------
# Output metadata (confirmation)
# --------------------------------------------------
echo ""
echo "=== Output Info ==="
ffprobe -v error -show_entries format=duration,size -show_entries stream=width,height,r_frame_rate -of default=noprint_wrappers=1 "$OUTPUT" 2>/dev/null || true

echo ""
echo "COMPLETE: $OUTPUT"

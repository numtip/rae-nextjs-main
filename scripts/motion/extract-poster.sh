#!/usr/bin/env bash
set -eu

# ============================================================
# RAE Motion Pipeline — Poster Frame Extractor
# RC4.4 Motion Asset Workspace
#
# Extracts a single frame from a video to serve as the
# <video poster="..."> image.
#
# Usage:
#   rtk bash scripts/motion/extract-poster.sh <input> <output>
#
# Example:
#   rtk bash scripts/motion/extract-poster.sh \
#     "F:/ProjectAI/rae-motion-lab/compressed/rae-hero-motion-v1-20260614.mp4" \
#     "F:/ProjectAI/rae-motion-lab/posters/rae-hero-poster-v1-20260614.jpg"
# ============================================================

INPUT="${1:-}"
OUTPUT="${2:-}"
SEEK="${3:-1}"  # default: extract frame at 1 second

# --------------------------------------------------
# Validation
# --------------------------------------------------
if [ -z "$INPUT" ] || [ -z "$OUTPUT" ]; then
  echo "ERROR: Missing arguments."
  echo "Usage: $0 <input> <output> [seek_seconds]"
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
# Extract frame
# --------------------------------------------------
echo "=== Extracting poster frame at ${SEEK}s ==="

ffmpeg \
  -ss "$SEEK" \
  -i "$INPUT" \
  -vframes 1 \
  -q:v 2 \
  -y \
  "$OUTPUT"

echo ""
echo "COMPLETE: $OUTPUT"

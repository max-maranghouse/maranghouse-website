#!/usr/bin/env python3
"""
scripts/extract_assets.py

Pulls the base64-embedded images out of a bundled Claude design artifact and writes
them to ./cloudinary_upload as <first-8-chars-of-hash>.<ext> — the exact filenames
upload_to_cloudinary.py's MAP expects.

Fonts (woff2) are skipped deliberately: Fredoka One + Nunito load via next/font/google,
which is cleaner and cache-friendly.

Expected for Marang House: 11 JPG, 5 PNG, 4 GIF = 20 images.

SECURITY: no credentials involved. This is a local, one-time tool — never import it
from a page or component, and keep ./cloudinary_upload in .gitignore.

USAGE:
  python3 scripts/extract_assets.py Marang_House__standalone_.html
  # then: python3 scripts/upload_to_cloudinary.py
"""

import re
import json
import base64
import os
import sys
from collections import Counter

if len(sys.argv) < 2:
    sys.exit("Usage: python3 scripts/extract_assets.py <design.html>")

SRC = sys.argv[1]
OUT = "cloudinary_upload"  # git-ignored staging folder

EXT = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
}

html = open(SRC, encoding="utf-8").read()
m = re.search(r'<script type="__bundler/manifest">\s*(.*?)\s*</script>', html, re.DOTALL)
if not m:
    sys.exit("No __bundler/manifest block found. Is this a bundled Claude artifact?")

manifest = json.loads(m.group(1))
os.makedirs(OUT, exist_ok=True)

written, skipped_fonts, tally = 0, 0, Counter()

for key, info in manifest.items():
    mime = info.get("mime", "")
    ext = EXT.get(mime)
    if not ext:
        if "font" in mime or mime.endswith("woff2"):
            skipped_fonts += 1
        continue
    path = os.path.join(OUT, f"{key[:8]}.{ext}")
    try:
        with open(path, "wb") as f:
            f.write(base64.b64decode(info["data"]))
        written += 1
        tally[ext] += 1
        print(f"  {key[:8]}.{ext:<4} {os.path.getsize(path) / 1024:>8.0f} KB")
    except Exception as err:
        print(f"!! skip {key[:8]}: {err}")

breakdown = ", ".join(f"{n} {e.upper()}" for e, n in sorted(tally.items()))
print(f"\nExtracted {written} images ({breakdown}) to ./{OUT}")
print(f"Skipped {skipped_fonts} font file(s) — next/font handles those.")
if written != 20:
    print(f"NOTE: expected 20 images for this design, got {written}. Check ASSET-MAP.md.")
print("\nNext: python3 scripts/upload_to_cloudinary.py   (then delete ./cloudinary_upload)")

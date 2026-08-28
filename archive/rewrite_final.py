#!/usr/bin/env python3
"""Rewrites Marang House.html -> index.html, swapping local image paths for
Cloudinary URLs (with f_auto,q_auto optimization). Reads uploads_map.json."""
import json, re

SRC = "Marang House.html"
OUT = "index.html"
OPT = "f_auto,q_auto/"  # inserted after /upload/ for automatic format + quality

url_map = json.load(open("uploads_map.json"))
html = open(SRC, encoding="utf-8").read()

def optimize(url):
    # insert transformation right after '/upload/'
    return url.replace("/upload/", "/upload/" + OPT, 1)

replaced, missing = 0, []
for local_path, cloud_url in url_map.items():
    cloud_url_opt = optimize(cloud_url)
    # match the path whether wrapped in "" or '' (src or url())
    before = html
    html = html.replace(local_path, cloud_url_opt)
    if html != before:
        replaced += 1
    else:
        missing.append(local_path)

open(OUT, "w", encoding="utf-8").write(html)

print(f"Rewrote {replaced}/{len(url_map)} image paths -> {OUT}")
if missing:
    print(f"WARNING: {len(missing)} path(s) not found in HTML:")
    for m in missing:
        print(f"  {m}")

# Sanity: any local refs left behind?
leftover = re.findall(r'(?:src="|url\(["\']?)(uploads/|web-images/)[^"\')]+', html)
print(f"Leftover local refs: {len(leftover)}  (should be 0)")

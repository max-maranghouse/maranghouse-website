#!/usr/bin/env python3
"""
rewrite_html.py
Replaces every UUID image reference in the source HTML with the matching
Cloudinary URL from url_map.json. Writes index.html — the deployable file.
"""

import json
import re
import sys

if len(sys.argv) < 2:
    sys.exit("Usage: python3 rewrite_html.py <source.html>")

SRC = sys.argv[1]
OUT = "index.html"

url_map = json.load(open("url_map.json"))
html = open(SRC, encoding="utf-8").read()

replaced = 0
missing = set()

uuid_re = re.compile(r'[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}')

def repl(m):
    global replaced
    uuid = m.group(0)
    if uuid in url_map:
        replaced += 1
        return url_map[uuid]
    missing.add(uuid)
    return uuid

new_html = uuid_re.sub(repl, html)

with open(OUT, "w", encoding="utf-8") as f:
    f.write(new_html)

print(f"Replaced {replaced} references -> {OUT}")
if missing:
    print(f"WARNING: {len(missing)} UUID(s) had no Cloudinary match:")
    for u in missing:
        print(f"  {u}")
else:
    print("All referenced UUIDs matched. Clean.")

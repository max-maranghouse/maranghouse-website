#!/usr/bin/env python3
"""
upload_to_cloudinary.py
Uploads extracted Marang House images to Cloudinary under maranghouse/,
using each image's FULL UUID as the public ID. Reads credentials from .env.
"""

import os
import re
import json
import sys
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

load_dotenv()

CLOUD = os.getenv("CLOUDINARY_CLOUD_NAME")
KEY = os.getenv("CLOUDINARY_API_KEY")
SECRET = os.getenv("CLOUDINARY_API_SECRET")

if not all([CLOUD, KEY, SECRET]):
    sys.exit("Missing Cloudinary credentials. Check your .env file.")

cloudinary.config(cloud_name=CLOUD, api_key=KEY, api_secret=SECRET, secure=True)

STAGING = "cloudinary_upload"
TEMPLATE = "decoded_template.html"
FOLDER = "maranghouse"

uuids = set(re.findall(r'[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}', open(TEMPLATE).read()))
prefix_to_uuid = {u[:8]: u for u in uuids}

url_map = {}
files = sorted(os.listdir(STAGING))
print(f"Uploading {len(files)} images to Cloudinary folder '{FOLDER}/'...\n")

for fname in files:
    prefix, ext = os.path.splitext(fname)
    full_uuid = prefix_to_uuid.get(prefix)
    if not full_uuid:
        print(f"  !! no UUID match for {fname} — skipping")
        continue
    path = os.path.join(STAGING, fname)
    try:
        res = cloudinary.uploader.upload(
            path,
            public_id=full_uuid,
            folder=FOLDER,
            overwrite=True,
            resource_type="image",
        )
        url_map[full_uuid] = res["secure_url"]
        print(f"  ok  {full_uuid}  ->  {res['secure_url']}")
    except Exception as e:
        print(f"  !! failed {fname}: {e}")

with open("url_map.json", "w") as f:
    json.dump(url_map, f, indent=2)

print(f"\nUploaded {len(url_map)} images. Wrote url_map.json")
if len(url_map) != len(files):
    print(f"WARNING: {len(files) - len(url_map)} file(s) didn't map/upload — check above.")

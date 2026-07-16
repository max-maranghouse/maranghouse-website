#!/usr/bin/env python3
"""Uploads images referenced by Marang House.html to Cloudinary under maranghouse/."""
import os, re, json, sys
import cloudinary, cloudinary.uploader
from dotenv import load_dotenv

load_dotenv()
cfg = dict(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)
if not all(cfg.values()):
    sys.exit("Missing Cloudinary credentials. Check .env")
cloudinary.config(secure=True, **cfg)

SRC = "Marang House.html"
FOLDER = "maranghouse"
html = open(SRC, encoding="utf-8").read()
refs = set(re.findall(r'(?:src|href)="([^"]+\.(?:png|jpg|jpeg|gif|svg|webp))"', html))
refs |= set(re.findall(r'url\((?:["\']?)([^)"\']+\.(?:png|jpg|jpeg|gif|svg|webp))', html))

print(f"Found {len(refs)} referenced images.\n")
mapping = {}
for ref in sorted(refs):
    if not os.path.isfile(ref):
        print(f"  !! MISSING on disk: {ref}  (skipped)")
        continue
    base = os.path.splitext(os.path.basename(ref))[0]
    public_id = base.replace(" ", "_")
    try:
        res = cloudinary.uploader.upload(
            ref, public_id=public_id, folder=FOLDER,
            overwrite=True, resource_type="auto",
        )
        mapping[ref] = res["secure_url"]
        print(f"  ok  {ref}  ->  {res['secure_url']}")
    except Exception as e:
        print(f"  !! failed {ref}: {e}")

json.dump(mapping, open("uploads_map.json", "w"), indent=2)
print(f"\nUploaded {len(mapping)}/{len(refs)} images. Wrote uploads_map.json")
if len(mapping) != len(refs):
    print("WARNING: some images missing on disk — check above.")

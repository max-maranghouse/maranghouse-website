#!/usr/bin/env python3
"""
scripts/extract_design.py

Decodes a bundled Claude design artifact and dumps:
  1. decoded_template.html      — the real page, unbundled (useful for eyeballing structure)
  2. printed COLOURS + FONTS    — paste into BUILD-PLAN.md Section 4
  3. CONTENT-INVENTORY-raw.md   — ordered, per-page copy inventory

IMPORTANT — does NOT overwrite CONTENT-INVENTORY.md.
The hand-tidied CONTENT-INVENTORY.md is authoritative (mockup-corrected: 1998 not 1993,
real sponsor/testimonial names). This script writes the *raw* extraction to a separate
file so you can diff the two, not clobber the good one.

USAGE:
  python3 scripts/extract_design.py Marang_House__standalone_.html
"""

import re
import json
import sys
from html.parser import HTMLParser

if len(sys.argv) < 2:
    sys.exit("Usage: python3 scripts/extract_design.py <design.html>")

src = sys.argv[1]
html_raw = open(src, encoding="utf-8").read()

# ---------------------------------------------------------------- 1) decode template
m = re.search(r'<script type="__bundler/template">\s*(.*?)\s*</script>', html_raw, re.DOTALL)
if not m:
    sys.exit(
        "No __bundler/template block found. Is this a bundled Claude artifact?\n"
        "If the file is plain HTML, skip this script — the markup is already readable."
    )
tpl = json.loads(m.group(1))
open("decoded_template.html", "w", encoding="utf-8").write(tpl)

# ---------------------------------------------------------------- 2) colours + fonts
styles = "\n".join(re.findall(r"<style>(.*?)</style>", tpl, re.DOTALL))
colors = sorted(set(re.findall(r"#[0-9a-fA-F]{6}", styles + tpl)))
fonts = sorted(set(re.findall(r"font-family:\s*'([^']+)'", styles)))
print("COLOURS:", colors)
print("FONTS:  ", fonts)

# ---------------------------------------------------------------- 3) per-page copy
page_ids = re.findall(r'id="page-([a-zA-Z0-9_-]+)"', tpl)
spans = []
if page_ids:
    for pid in page_ids:
        spans.append((tpl.find(f'id="page-{pid}"'), pid))
    spans.sort()
    spans.append((len(tpl), "END"))
else:
    spans = [(0, "site"), (len(tpl), "END")]

TEXT_TAGS = (
    "h1", "h2", "h3", "h4", "p", "li", "button", "a", "span",
    "div", "blockquote", "figcaption", "label", "strong", "em",
)


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.out = []
        self.skip = 0
        self.cur = None

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.skip += 1
        if tag in TEXT_TAGS:
            self.cur = tag
        if tag == "img":
            self.out.append(("IMG", dict(attrs).get("alt", "")))

    def handle_endtag(self, tag):
        if tag in ("script", "style") and self.skip:
            self.skip -= 1

    def handle_data(self, data):
        if self.skip:
            return
        text = re.sub(r"\s+", " ", data).strip()
        if text:
            self.out.append((self.cur or "text", text))


lines = [
    "# CONTENT-INVENTORY (RAW EXTRACTION)",
    "",
    "> Auto-generated from the design bundle. NOT authoritative.",
    "> The hand-tidied `CONTENT-INVENTORY.md` wins — it carries the mockup corrections.",
    "> Use this only to check nothing was missed.",
    "",
]

for i in range(len(spans) - 1):
    start, name = spans[i]
    if name == "END":
        continue
    seg = tpl[start:spans[i + 1][0]]
    seg = re.sub(r"<script.*?</script>", " ", seg, flags=re.DOTALL)
    seg = re.sub(r"<style.*?</style>", " ", seg, flags=re.DOTALL)
    parser = TextExtractor()
    parser.feed(seg)
    lines.append(f"\n## PAGE: {name}\n")
    seen = set()
    for tag, txt in parser.out:
        if (tag, txt) in seen:
            continue
        seen.add((tag, txt))
        lines.append(f"- [{'img' if tag == 'IMG' else tag}] {txt}")

open("CONTENT-INVENTORY-raw.md", "w", encoding="utf-8").write("\n".join(lines))
print("\nWrote decoded_template.html + CONTENT-INVENTORY-raw.md")
print("Paste the colours/fonts above into BUILD-PLAN.md Section 4 if they differ.")

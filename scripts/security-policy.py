#!/usr/bin/env python3
"""Check committed files for likely secrets and unsafe workflow constructs."""

from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
PATTERNS = {
    "GitHub token": re.compile(r"(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}"),
    "OpenAI-style secret": re.compile(r"\bsk-[A-Za-z0-9_-]{20,}"),
    "Google API key": re.compile(r"\bAIza[A-Za-z0-9_-]{20,}"),
    "AWS access key": re.compile(r"\bAKIA[A-Z0-9]{16}\b"),
    "Private key": re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
}
ACTION = re.compile(r"^\s*-?\s*uses:\s*([^\s#]+)", re.MULTILINE)
PINNED = re.compile(r"^[^/]+/[^/@]+(?:/[^@]+)?@[a-f0-9]{40}$")


def tracked_files() -> list[Path]:
    output = subprocess.check_output(["git", "ls-files", "-co", "--exclude-standard", "-z"], cwd=ROOT)
    return [ROOT / item.decode() for item in output.split(b"\0") if item]


def main() -> int:
    errors: list[str] = []
    for path in tracked_files():
        if not path.is_file():
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        for number, line in enumerate(text.splitlines(), start=1):
            for label, pattern in PATTERNS.items():
                if pattern.search(line):
                    errors.append(f"{path.relative_to(ROOT)}:{number}: possible {label}; value suppressed")

    workflows = list((ROOT / ".github" / "workflows").glob("*.y*ml"))
    for path in workflows:
        text = path.read_text(encoding="utf-8")
        if "pull_request_target:" in text:
            errors.append(f"{path.relative_to(ROOT)}: pull_request_target is prohibited")
        if "permissions:" not in text:
            errors.append(f"{path.relative_to(ROOT)}: explicit permissions are required")
        for use in ACTION.findall(text):
            if not (use.startswith("./") or use.startswith("docker://") or PINNED.fullmatch(use)):
                errors.append(f"{path.relative_to(ROOT)}: unpinned action {use}")

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"Security policy passed for {len(workflows)} workflow(s); values are never printed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


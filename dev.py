from __future__ import annotations

import subprocess


def run(command: list[str]) -> int:
    return subprocess.call(command)


def main() -> int:
    return run(["make", "backend-dev"])


if __name__ == "__main__":
    raise SystemExit(main())

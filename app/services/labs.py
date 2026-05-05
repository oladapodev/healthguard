from __future__ import annotations


def parse_lab_content(payload: bytes) -> str:
    """Parse uploaded lab text content into internal normalized text."""
    return payload.decode("utf-8", errors="ignore")

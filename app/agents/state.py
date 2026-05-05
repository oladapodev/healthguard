from __future__ import annotations

from typing import TypedDict

from app.schemas.lab import LabMarker


class HealthGuardAgentState(TypedDict, total=False):
    lab_id: str
    user_id: str
    markers: list[LabMarker]
    patient_context: dict[str, object]
    environmental_context: dict[str, object]
    intake_summary: str
    key_patterns: list[str]
    safety_flags: list[str]
    patient_summary: str
    clinician_summary: str
    trace_id: str

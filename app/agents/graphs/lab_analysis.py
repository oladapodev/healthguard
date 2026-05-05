from __future__ import annotations

from app.agents.state import HealthGuardAgentState


def build_lab_analysis_graph() -> None:
    """Placeholder for the LangGraph lab analysis workflow."""

    return None


def run_lab_analysis_stub(state: HealthGuardAgentState) -> HealthGuardAgentState:
    markers = state.get("markers", [])
    return {
        **state,
        "intake_summary": f"Received {len(markers)} extracted lab markers for review.",
        "key_patterns": [],
        "safety_flags": [
            "This output is not a diagnosis and must be reviewed with a qualified clinician."
        ],
        "patient_summary": "Your lab document was received. Detailed AI analysis is the next workflow step.",
        "clinician_summary": "Lab payload received; structured analysis graph is pending implementation.",
    }

from __future__ import annotations


def weather_tool(location: str) -> dict[str, str]:
    return {"location": location, "temperature_c": "25", "aqi": "moderate"}

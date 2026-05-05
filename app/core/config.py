from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    app_env: str = "local"
    project_name: str = "HealthGuard AI"
    api_prefix: str = "/api/v1"
    backend_host: str = "0.0.0.0"
    backend_port: int = 8000
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    database_url: str = "postgresql://postgres:postgres@localhost:5432/healthguard"
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 60


settings = Settings()

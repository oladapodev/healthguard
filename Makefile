.PHONY: dev install install-frontend install-backend frontend backend gen lint test dev-backend dev-frontend setup-git-hooks docker-up docker-down

BACKEND_BIN := uv
FRONTEND_BIN := bun
UV_CACHE_DIR := /tmp/uv_cache

dev:
	$(MAKE) -j2 dev-backend dev-frontend

dev-backend:
	UV_CACHE_DIR=$(UV_CACHE_DIR) $(BACKEND_BIN) run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev-frontend:
	@if command -v $(FRONTEND_BIN) >/dev/null 2>&1; then \
		cd web && $(FRONTEND_BIN) run dev; \
	else \
		echo "bun is not installed or not on PATH. Install Bun to run the frontend."; \
		exit 1; \
	fi

install:
	@echo "Use one of:"
	@echo "  make install-frontend"
	@echo "  make install-backend"
	@echo "  or 'make frontend' / 'make backend' as aliases."

install-frontend:
	@if command -v $(FRONTEND_BIN) >/dev/null 2>&1; then \
		cd web && $(FRONTEND_BIN) install; \
	else \
		echo "bun is not installed or not on PATH. Install Bun and try again."; \
		exit 1; \
	fi

install-backend:
	UV_CACHE_DIR=$(UV_CACHE_DIR) $(BACKEND_BIN) sync

frontend:
	$(MAKE) install-frontend

backend:
	$(MAKE) install-backend

gen:
	@PYTHONPATH=. UV_CACHE_DIR=$(UV_CACHE_DIR) $(BACKEND_BIN) run python scripts/generate_hello_frontend.py

lint:
	UV_CACHE_DIR=$(UV_CACHE_DIR) $(BACKEND_BIN) run ruff check app app/tests
	@if command -v $(FRONTEND_BIN) >/dev/null 2>&1 && [ -d web/node_modules ]; then \
		cd web && $(FRONTEND_BIN) x tsc --noEmit; \
	else \
		echo "Skipping frontend type check (bun missing or web/node_modules missing)."; \
	fi

test:
	UV_CACHE_DIR=$(UV_CACHE_DIR) $(BACKEND_BIN) run pytest
	@if command -v $(FRONTEND_BIN) >/dev/null 2>&1 && [ -d web/node_modules ] && [ -n "$$(find web -type f \( -name '*.test.ts' -o -name '*.test.tsx' -o -name '*.test.js' -o -name '*.test.jsx' -o -name '*_test.ts' -o -name '*_test.tsx' -o -name '*_test.js' -o -name '*_test.jsx' -o -name '*.spec.ts' -o -name '*.spec.tsx' -o -name '*.spec.js' -o -name '*.spec.jsx' \) )" ]; then \
		cd web && $(FRONTEND_BIN) test; \
	else \
		echo "Skipping frontend tests (bun missing, web/node_modules missing, or no frontend test files)."; \
	fi

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down -v

setup-git-hooks:
	mkdir -p .git/hooks
	cp .githooks/pre-commit .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit
	@echo "Installed pre-commit hook: .git/hooks/pre-commit"

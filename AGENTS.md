# AGENTS.md - Retara
Read this first. Every AI tool working in this repo must follow it.

## Project
Retara: AI-powered eye-screening web platform (final-year project, UMT Lahore).
Preliminary screening only. Never give a diagnosis, prescription or dose.
Details: docs/ai/PROJECT_CONTEXT.md. Architecture: docs/ai/ARCHITECTURE.md.
Past work and known problems: docs/ai/worklog/ (read the 5 newest files).

## Layout
- backend/     Django 5.2 + Django REST Framework (PostgreSQL; SQLite for quick start)
- frontend/    Next.js (App Router, TypeScript)
- ai-services/ FastAPI. Called only by the Django backend.
- docs/        report, diagrams, minutes, AI notes
Flow: browser -> Next.js (/api proxy) -> Django -> FastAPI

## Commands
- backend:     cd backend; source .venv/Scripts/activate; python manage.py runserver | test | migrate
- frontend:    cd frontend; npm run dev | npm run lint | npm run build
- ai-services: cd ai-services; source .venv/Scripts/activate; uvicorn app.main:app --port 8001 --reload; pytest

## Roles (use these exact names)
Super Admin, Clinic Administrator, Doctor, Pharmacy User, Patient
(codes: super_admin, clinic_admin, doctor, pharmacy_user, patient)
Accounts: patients register and verify email; the Super Admin creates clinic and pharmacy
accounts; clinics create doctor accounts; first credentials are emailed; the user must
change the password at first login.

## Rules
1. Work only on the ticket you were given (S1-x / GitHub issue). Do not refactor unrelated files.
2. Never commit secrets, .env, datasets, model weights, or patient / mBRSET data.
   Never paste them into an AI tool. Never send eye images or personal identifiers to an LLM API.
3. Shared tables and migrations: commit migration files; never edit or delete an existing migration.
4. All UI and API text about results must be non-diagnostic and show a professional-care disclaimer.
5. Add or update tests and run them before saying the work is done.
6. Branch: feature/<member>-<ticket>-<topic>. Never push to main. Open a PR with "Closes #<issue>".
7. Do not invent requirements. If unsure, ask the user or record the question in the worklog.

## Before you finish (mandatory)
Create docs/ai/worklog/YYYY-MM-DD-<member>-<ticket>-<slug>.md from docs/ai/worklog/_TEMPLATE.md.
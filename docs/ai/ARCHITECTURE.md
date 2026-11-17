# Architecture
Browser -> Next.js (dev proxy /api) -> Django REST -> PostgreSQL; Django -> FastAPI (AI).
Sprint 1 tables: User (with role, must_change_password), Clinic, Pharmacy, DoctorProfile,
ConsentRecord, EmailToken, AuditLog.
Auth mechanism (session vs token) is decided in ticket S1-3; record the choice in DECISIONS.md.
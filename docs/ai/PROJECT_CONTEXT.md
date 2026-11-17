# Retara - project context
Goal: preliminary eye screening (fundus and front-eye images), AI assistant, doctor discovery,
appointments, pharmacy support. Not a diagnostic device.
Team: Abdullah Javed, Mehran Khan, Muhammad Umar Zarar, Jawad Ahmad. Supervisor: Mam Insha Rafique.
## Sprint 1 (16-27 Nov 2026): authentication and onboarding
Stories: AUTH-01 patient sign-up, AUTH-02 login/logout, AUTH-05 role-based access,
AUTH-11 forced password change, ADM-01 Super Admin creates clinic/pharmacy accounts,
CLN-02 clinic creates doctors, DOC-01 doctor profile, DISC-01 doctor search.
Out of scope this sprint: AI screening, assistant, appointments, pharmacy orders.
## Domain rules
- Lockout after 5 failed logins; sessions expire after inactivity.
- Initial credentials are emailed; must_change_password blocks all pages until changed.
- Only active doctors appear in search.
- Account creation is written to the audit log.
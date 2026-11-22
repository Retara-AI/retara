from django.contrib.auth.models import AbstractUser
from django.db import models


class Role(models.TextChoices):
    SUPER_ADMIN = "super_admin", "Super Admin"
    CLINIC_ADMIN = "clinic_admin", "Clinic Administrator"
    DOCTOR = "doctor", "Doctor"
    PHARMACY_USER = "pharmacy_user", "Pharmacy User"
    PATIENT = "patient", "Patient"


class User(AbstractUser):
    email = models.EmailField("email address", unique=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.PATIENT)
    must_change_password = models.BooleanField(default=False)

    REQUIRED_FIELDS = ["email"]

    # --- FIX FOR THE CLASH ---
    groups = models.ManyToManyField(
        "auth.Group",
        verbose_name="groups",
        blank=True,
        help_text="The groups this user belongs to.",
        related_name="retara_user_groups",  # Unique name
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        verbose_name="user permissions",
        blank=True,
        help_text="Specific permissions for this user.",
        related_name="retara_user_permissions",  # Unique name
        related_query_name="user",
    )

    def __str__(self):
        return self.username

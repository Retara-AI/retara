from django.test import TestCase
from django.urls import reverse


class HealthCheckTest(TestCase):
    def test_health_endpoint(self):
        """Test that the health endpoint returns a 200 OK."""
        url = reverse("health")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok", "service": "retara-backend"})

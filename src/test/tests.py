from http import HTTPStatus

from django.test import TestCase
from django.test import Client

class RobotsTxtTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_get(self):
        response = self.client.get("/robots.txt")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response["content-type"], "text/plain")
        lines = response.content.decode().splitlines()
        self.assertEqual(lines[0], "User-agent: *")

    def test_post_disallowed(self):
        response = self.client.post("/robots.txt")

        self.assertEqual(HTTPStatus.METHOD_NOT_ALLOWED, response.status_code)

class HumanTxtTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_get(self):
        response = self.client.get("/humans.txt")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response["content-type"], "text/plain")

    def test_post_disallowed(self):
        response = self.client.post("/humans.txt")

        self.assertEqual(HTTPStatus.METHOD_NOT_ALLOWED, response.status_code)

if __name__ == '__main__':
    RobotsTxtTests.run()
    HumanTxtTests.run()

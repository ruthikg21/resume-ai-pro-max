import requests
import os

# Configuration
BASE_URL = "http://127.0.0.1:8000"
SAMPLE_PDF = "sample_resume.pdf"  # Create a dummy pdf for testing if needed or use existing

def test_root():
    """Test the root endpoint."""
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Root Endpoint: {response.status_code} - {response.json()}")
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to server. Is it running?")

def test_match_job_simple():
    """Test the pure text matching endpoint."""
    payload = {
        "resume_text": "Experienced Python Developer with Flask and AWS skills.",
        "jd_text": "Looking for a Python Developer with experience in Flask and Cloud (AWS)."
    }
    response = requests.post(f"{BASE_URL}/match-job", json=payload)
    print(f"\nMatch Job Endpoint: {response.status_code}")
    print(response.json())

if __name__ == "__main__":
    print("--- Testing API ---")
    test_root()
    test_match_job_simple()
    print("\nTo test file uploads, run the server and use the Swagger UI at http://127.0.0.1:8000/docs")

# AI Resume Analyzer - Backend Setup

## Prerequisites
- Python 3.9+
- pip

## Setup Instructions

1.  **Navigate to the backend directory**
    ```bash
    cd backend
    ```

2.  **Create a Virtual Environment** (Recommended)
    ```bash
    # Windows
    python -m venv venv
    .\venv\Scripts\activate
    
    # Mac/Linux
    # python3 -m venv venv
    # source venv/bin/activate
    ```

3.  **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Download AI Models**
    ```bash
    python -m spacy download en_core_web_sm
    ```

## Running the Server

Start the API server using uvicorn:
```bash
uvicorn main:app --reload
```

- **API URL**: `http://127.0.0.1:8000`
- **Swagger Docs**: `http://127.0.0.1:8000/docs` (Use this toward test endpoints manually)

## Testing
Run the simple test script:
```bash
python test_api.py
```

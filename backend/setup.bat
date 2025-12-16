@echo off
echo Installing dependencies for Resume AI Backend...
echo.

REM 1. Activate venv (just in case user runs it from outside, though they should be inside)
if exist venv\Scripts\activate (
    call venv\Scripts\activate
)

REM 2. Upgrade build tools and fix SSL issue
echo [1/6] Upgrading pip and fixing urllib3...
python -m pip install --upgrade pip setuptools wheel
pip install "urllib3<2.0.0"

REM 3. Install Numpy (Force Binary)
echo [2/6] Installing Numpy...
pip install "numpy==1.21.6" --only-binary=:all:

REM 4. Install SpaCy (Force Binary)
echo [3/6] Installing SpaCy...
pip install "spacy==3.5.3" --only-binary=:all:

REM 5. Install Scikit-Learn (Force Binary)
echo [4/6] Installing Scikit-Learn...
pip install "scikit-learn==1.0.2" --only-binary=:all:

REM 6. Install Other Dependencies
echo [5/6] Installing FastAPI and simple libs...
pip install "fastapi==0.95.2" "uvicorn==0.22.0" "python-multipart" "pypdf==3.9.0" "python-docx==0.8.11"
REM 7. Fix Conflicts (Aggressive)
echo [6/6] Finalizing dependencies...
pip uninstall -y typing-extensions
pip install "typing-extensions==4.7.1"
python -m spacy download en_core_web_sm

echo.
echo Dependency installation complete!
echo You can now run the server with: uvicorn main:app --reload
pause

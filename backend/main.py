import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

# Import our modules
from resume_parser import parse_resume
from text_cleaner import clean_text
from skill_extractor import extract_skills, extract_education, extract_experience
from scoring_logic import calculate_resume_score, generate_suggestions

app = FastAPI(title="AI Resume Analyzer API", version="1.0")

# Configure CORS - Allow all origins for deployment
# This ensures the frontend can connect from any domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class AnalysisResponse(BaseModel):
    resume_score: int
    skills_found: List[str]
    experience_years: int  # Placeholder logic
    education: List[str]
    suggestions: List[str]

# --- Endpoints ---

@app.get("/")
def home():
    return {"message": "AI Resume Analyzer Backend is Running"}

@app.get("/health")
def health_check():
    """Health check endpoint for Render deployment."""
    return {"status": "healthy", "message": "API is running"}

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    """
    Extracts text from an uploaded resume (PDF or DOCX).
    """
    raw_text = await parse_resume(file)
    cleaned_text = clean_text(raw_text)
    return {"filename": file.filename, "extracted_text": cleaned_text}

@app.post("/analyze-resume", response_model=AnalysisResponse)
async def analyze_resume(file: UploadFile = File(...)):
    """
    Full analysis endpoint:
    1. Parse resume
    2. Extract skills
    3. Calculate score
    4. Generate suggestions
    """
    # 1. Parse & Clean
    raw_text = await parse_resume(file)
    text = clean_text(raw_text)
    
    # 2. Extract Info
    skills = extract_skills(text)
    # Placeholder for experience/edu
    experience_years = 2  # default placeholder until ML model implemented
    education = extract_education(text) 
    
    # 3. Score Logic
    resume_score = calculate_resume_score(skills, experience_years)
    
    # 4. Suggestions
    suggestions = generate_suggestions(skills, resume_score)
    
    return {
        "resume_score": resume_score,
        "skills_found": skills,
        "experience_years": experience_years,
        "education": education,
        "suggestions": suggestions
    }


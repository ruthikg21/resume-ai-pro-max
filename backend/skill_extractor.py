import spacy
from spacy.matcher import PhraseMatcher
from typing import List

# Load spaCy model (ensure "python -m spacy download en_core_web_sm" is run)
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    # Fallback if model isn't downloaded yet, though in prod we should ensure it exists
    print("Warning: en_core_web_sm not found. Downloading...")
    from spacy.cli import download
    download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

# Define a predefined list of skills (can be expanded)
SKILL_DB = [
    "Python", "Java", "C++", "C#", "JavaScript", "TypeScript", "React", "Angular", "Vue",
    "Node.js", "Express", "Django", "Flask", "FastAPI", "Spring Boot", "SQL", "NoSQL",
    "PostgreSQL", "MongoDB", "MySQL", "AWS", "Azure", "GCP", "Docker", "Kubernetes",
    "Git", "CI/CD", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch",
    "Scikit-learn", "Pandas", "NumPy", "Data Analysis", "NLP", "Computer Vision",
    "HTML", "CSS", "SASS", "Tailwind", "Bootstrap", "Redux", "GraphQL", "REST API",
    "Agile", "Scrum", "JIRA", "Communication", "Teamwork", "Problem Solving"
]

def extract_skills(text: str) -> List[str]:
    """
    Extracts skills from text using spaCy PhraseMatcher against a predefined skill database.
    """
    doc = nlp(text)
    matcher = PhraseMatcher(nlp.vocab, attr="LOWER") # Case insensitive match
    patterns = [nlp.make_doc(skill) for skill in SKILL_DB]
    matcher.add("SKILLS", patterns)
    
    matches = matcher(doc)
    found_skills = set()
    
    for match_id, start, end in matches:
        span = doc[start:end]
        found_skills.add(span.text) # Keep original case from text, or use span.text.title()
        
    # Return list of unique capitalized skills
    return list({skill.title() for skill in found_skills})

def extract_experience(text: str) -> str:
    # Placeholder for complex experience extraction (requires rigorous regex or model)
    # Returning a generic message or simple regex match for "years of experience"
    # For now, let's keep it simple as requested
    return "Not implemented (requires ML extraction)"

def extract_education(text: str) -> List[str]:
    # Placeholder for education extraction
    return []

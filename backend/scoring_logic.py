from typing import List

def calculate_resume_score(skills: List[str], experience_years: int = 0) -> int:
    """
    Calculates a resume score (0-100) based on simple heuristics.
    """
    score = 0
    
    # 1. Skills Score (Max 50)
    # Let's assume having 10+ skills is excellent
    if len(skills) >= 10:
        score += 50
    elif len(skills) >= 5:
        score += 30
    elif len(skills) >= 1:
        score += 10
        
    # 2. Experience Score (Max 30)
    # Placeholder: if we had extracted generic experience
    # For now, we default to a baseline if experience isn't reliably parsed
    score += 20 # Baseline for having a resume content
    
    # 3. Formatting/Structure (Max 20)
    # Assumed good if parsed correctly
    score += 15
    
    return min(100, score)

def generate_suggestions(skills: List[str], score: int) -> List[str]:
    suggestions = []
    
    if len(skills) < 5:
        suggestions.append("Add more technical skills to your resume to increase visibility.")
    
    if score < 50:
        suggestions.append("Your resume is brief. Consider adding more details about your projects and roles.")
        
    if "Python" not in skills and "Java" not in skills and "JavaScript" not in skills:
        suggestions.append("Consider learning high-demand languages like Python, Java, or JavaScript.")
        
    if not suggestions:
        suggestions.append("Great resume! Keep it updated with your latest achievements.")
        
    return suggestions

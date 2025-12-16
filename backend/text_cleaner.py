import re

def clean_text(text: str) -> str:
    """
    Cleans the input text by:
    - Removing extra whitespace
    - Removing email addresses (optional, can be kept for extraction) - keeping them for now but normalizing
    - Removing special characters (keeping basic punctuation)
    - Lowercasing (optional, usually done during NLP processing, but we'll return raw-ish clean text)
    """
    if not text:
        return ""

    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Simple cleaning: remove non-printable characters
    text = ''.join(char for char in text if char.isprintable())
    
    return text

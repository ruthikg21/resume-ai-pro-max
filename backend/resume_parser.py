import os
from pypdf import PdfReader
from docx import Document
from fastapi import UploadFile, HTTPException

def extract_text_from_pdf(file_path: str) -> str:
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading PDF: {str(e)}")

def extract_text_from_docx(file_path: str) -> str:
    try:
        doc = Document(file_path)
        text = ""
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading DOCX: {str(e)}")

async def parse_resume(file: UploadFile) -> str:
    """
    Main function to handle file upload and text extraction.
    Saves temporary file if needed or reads from memory.
    """
    filename = file.filename
    file_ext = filename.split(".")[-1].lower()

    # Create a simple temp file to read (parsers usually need a file path or stream)
    # For pypdf and python-docx, bytes stream is often okay, but saving to temp is safer for all cases
    temp_path = f"temp_{filename}"
    
    try:
        with open(temp_path, "wb") as f:
            content = await file.read()
            f.write(content)

        if file_ext == "pdf":
            text = extract_text_from_pdf(temp_path)
        elif file_ext in ["docx", "doc"]:
            text = extract_text_from_docx(temp_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF or DOCX.")
        
        return text
    finally:
        # Cleanup
        if os.path.exists(temp_path):
            os.remove(temp_path)

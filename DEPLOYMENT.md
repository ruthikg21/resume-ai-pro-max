# Deployment Guide - Resume AI Pro

This guide explains how to deploy the Resume AI Pro application with the backend on **Render** and the frontend on **Vercel**.

## Architecture Overview

```
┌─────────────────┐         API Calls        ┌─────────────────┐
│   Frontend      │ ◄─────────────────────► │   Backend       │
│   (Vercel)      │    /analyze-resume       │   (Render)      │
│   React + Vite  │                          │   FastAPI       │
└─────────────────┘                          └─────────────────┘
```

## Step 1: Deploy Backend on Render

### 1.1 Create Render Account
- Go to [render.com](https://render.com) and sign up/login

### 1.2 Deploy from GitHub
1. Click **New → Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `resume-ai-backend` (or your choice)
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt && python -m spacy download en_core_web_sm`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 1.3 Set Environment Variables (in Render Dashboard)
| Variable | Value |
|----------|-------|
| `PYTHON_VERSION` | `3.11.0` |
| `PRODUCTION` | `true` |
| `FRONTEND_URL` | Your Vercel URL (e.g., `https://resume-ai-pro.vercel.app`) |

### 1.4 Wait for Deployment
- Render will build and deploy your backend
- Note your backend URL (e.g., `https://resume-ai-backend.onrender.com`)

### 1.5 Verify Health Check
- Visit `https://your-backend.onrender.com/health`
- You should see: `{"status": "healthy", "message": "API is running"}`

---

## Step 2: Deploy Frontend on Vercel

### 2.1 Create Vercel Account
- Go to [vercel.com](https://vercel.com) and sign up/login

### 2.2 Deploy from GitHub
1. Click **Add New → Project**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`

### 2.3 Set Environment Variables (in Vercel Dashboard)
| Variable | Value |
|----------|-------|
| `VITE_API_URL` | Your Render backend URL (e.g., `https://resume-ai-backend.onrender.com`) |

> ⚠️ **Important**: Vite environment variables MUST start with `VITE_` to be exposed to the client.

### 2.4 Deploy
- Click **Deploy**
- Note your frontend URL (e.g., `https://resume-ai-pro.vercel.app`)

---

## Step 3: Update Backend CORS (if needed)

After deploying the frontend, go back to Render and update the `FRONTEND_URL` environment variable with your actual Vercel URL.

---

## Troubleshooting

### "Analysis Failed" Error
1. Open browser DevTools (F12) → Network tab
2. Upload a resume and check the failed request
3. Common issues:
   - **CORS Error**: Update `FRONTEND_URL` in Render
   - **502 Bad Gateway**: Backend is still spinning up (Render free tier sleeps after 15 min inactivity)
   - **Connection refused**: Check `VITE_API_URL` in Vercel

### Backend Not Responding
- Render free tier puts services to sleep after 15 minutes of inactivity
- First request after sleep takes ~30-60 seconds to wake up
- **Solution**: Upgrade to paid tier or use a service like healthchecks.io to ping your backend

### Resume Parsing Fails
- Check if the file is actually a PDF or DOCX
- File size must be < 10MB
- Password-protected files are not supported

---

## Local Development

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:8080` and connect to `http://localhost:8000` by default.

---

## Environment Files

### Frontend (.env or .env.local)
```env
VITE_API_URL=http://localhost:8000
```

### Backend (for reference, Render uses dashboard)
```env
PRODUCTION=true
FRONTEND_URL=https://your-vercel-app.vercel.app
```

# NeuroFace AI

Integrated React + FastAPI face recognition and deepfake detection system.

## Run Backend

```powershell
.\start-backend.ps1
```

Manual:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 5000
```

## Run Frontend

```powershell
.\start-frontend.ps1
```

Manual:

```powershell
cd frontend
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

## Environment

Copy the examples before running:

```powershell
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
```

Frontend uses `VITE_API_BASE_URL=http://localhost:5000`.

## API Contract

- `GET /`
- `GET /health`
- `GET /model-info`
- `GET /metrics`
- `GET /analytics`
- `POST /predict-live`
- `POST /predict-single`
- `POST /predict-multiple`

The backend loads the existing files in `backend/saved_model` once at startup and never retrains or regenerates embeddings.

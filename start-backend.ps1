Set-Location "$PSScriptRoot\backend"
if (-not (Test-Path ".venv")) {
  python -m venv .venv
}
.\.venv\Scripts\Activate.ps1
$env:DEBUG = "false"
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 5000

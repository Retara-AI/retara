from fastapi import FastAPI

app = FastAPI(title="Retara AI Services")


@app.get("/health")
def health():
    return {"status": "ok", "service": "retara-ai-services"}

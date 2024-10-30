from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

app = FastAPI(
    title="FundView Backend API",
    description="Backend API for FundView that collects, manages, and serves fund, stock, and industry data.",
    version="1.0.0",
)

# Dev configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Production configuration example
# origins = [
#     "http://localhost.tiangolo.com",
#     "https://localhost.tiangolo.com",
#     "http://localhost",
#     "http://localhost:8080",
# ]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["GET", "POST"],  # Specify allowed methods
#     allow_headers=["Content-Type", "Authorization"],  # Specify allowed headers
# )

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello")
async def root():
    return {"Hello From FASTAPI!!!!!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

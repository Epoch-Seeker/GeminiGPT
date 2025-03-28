import os
from langchain_google_genai import  ChatGoogleGenerativeAI
from fastapi import FastAPI , HTTPException
from pydantic import BaseModel , Field
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import requests
from fastapi import Request
import traceback

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

app =  FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend's domain in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class Chatrequest(BaseModel):
    message :  str
    currentModel: str 

@app.get("/models")
async def get_models():
    try:
        url = f"https://generativelanguage.googleapis.com/v1/models?key={GEMINI_API_KEY}"
        response = requests.get(url)

        if response.status_code  != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to  fetch models")
        
        data = response.json()

        models = [
            {
                "id": model.get("name"),  # Using 'name' as ID
                "name": model.get("displayName", model.get("name"))  # Use 'displayName' if available
            }
            for model in data.get("models", [])
        ]

        return {"models": models}
    
    except Exception  as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/")
async def chat(request: Request):
    try:
        data = await request.json()  # Debugging
        
        parsed_request = Chatrequest(**data)  # Validate against Pydantic model
        model_name = parsed_request.currentModel.replace("models/", "") 
        model = ChatGoogleGenerativeAI(model=model_name ,google_api_key=GEMINI_API_KEY)
        response = model.invoke(parsed_request.message)

        return {"message": response.content if response else "No response received"}

    
    except Exception as e:
    
        error_details = traceback.format_exc()
        print("Error:", error_details)  # Full error trace
        raise HTTPException(status_code=500, detail=str(e))
    
#uvicorn server:app --reload --host 0.0.0.0 --port 3080
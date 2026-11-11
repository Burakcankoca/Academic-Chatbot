from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Academic Chatbot API",
              description="A simple academic chatbot API using OpenAI's GPT-4o", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
SYSTEM_PROMPT = """You are an expert academic writing assistant. Your task is to transform any given text into formal, scholarly academic writing.

Follow these rules:
1. Use formal, precise academic language and terminology
2. Eliminate colloquialisms, contractions, and informal expressions
3. Employ passive voice where appropriate for academic convention
4. Add transitional phrases and logical connectors (furthermore, however, consequently, etc.)
5. Improve sentence structure for clarity and sophistication
6. Maintain the original meaning while elevating the academic tone
7. Use discipline-appropriate vocabulary
8. Ensure proper paragraph structure with clear topic sentences

Respond ONLY with the academically rewritten text. Do not add explanations or commentary unless asked."""


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


class ChatResponse(BaseModel):
    response: str


@app.get("/")
def read_root():
    return {"message": "Academic Writing Chatbot API is running!"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.messages:
        raise HTTPException(status_code=400, detail="Messages cannot be empty")

    openai_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in request.messages:
        openai_messages.append({"role": msg.role, "content": msg.content})

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=openai_messages,
            temperature=0.4,
            max_completion_tokens=2000,
        )
        reply = response.choices[0].message.content
        return ChatResponse(response=reply)
    except Exception as e:
        print("OPENAI ERROR:", str(e))
        raise HTTPException(
            status_code=500, detail=f"OpenAI API error: {str(e)}")

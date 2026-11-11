from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

# Ollama'yı OpenAI uyumlu endpoint olarak kullanıyoruz
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",  # yerelde zorunlu değil ama client bunu bekliyor
)

MODEL_NAME = "gemma3:12b"  # Ollama'da tanımlı model adı

SYSTEM_PROMPT = """Sen uzman bir akademik yazım asistanısın. Verilen metni anlamını koruyarak daha resmi, tutarlı ve akademik bir üslupla yeniden yaz.

Kurallar:
1. Resmî ve akademik dil kullan.
2. Günlük konuşma ifadelerini kaldır.
3. Cümle yapısını daha açık ve güçlü hâle getir.
4. Gerekli yerlerde bağlaçlar kullan.
5. Anlamı değiştirme, sadece üslubu geliştir.
6. Açıklama yapma.
7. Sadece yeniden yazılmış metni ver.
"""

app = FastAPI(
    title="Academic Chatbot API",
    description="Academic rewriting API powered by a local Ollama model",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


class ChatResponse(BaseModel):
    response: str


@app.get("/")
def read_root():
    return {
        "message": "Academic Writing Chatbot API is running with a local LLM via Ollama!"
    }


@app.get("/health")
def health():
    return {"status": "ok", "model": MODEL_NAME}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.messages:
        raise HTTPException(status_code=400, detail="Messages cannot be empty")

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in request.messages:
        messages.append({"role": msg.role, "content": msg.content})

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=messages,
            temperature=0.4,
            max_tokens=2000,
        )

        reply = response.choices[0].message.content or ""
        return ChatResponse(response=reply)

    except Exception as e:
        print("LOCAL LLM ERROR:", str(e))
        raise HTTPException(
            status_code=500,
            detail=f"Local model error: {str(e)}"
        )

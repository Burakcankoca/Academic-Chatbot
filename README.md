# Academic Chat Bot

An AI chatbot that rewrites everyday text in a formal, academic style. Type a sentence or paragraph in the chat window and get back an academically rewritten version that keeps the original meaning.

The backend is a small FastAPI service with two interchangeable model options:

- **`main.py`**: OpenAI **GPT-4o** (needs an OpenAI API key)
- **`main_ollama.py`**: a local **Gemma 3 12B** model served by [Ollama](https://ollama.com) (no API key, runs offline)

The frontend is a React chat interface built with Vite.

## Tech stack

| Layer | Tools |
|---|---|
| Backend | Python, FastAPI, Uvicorn, Pydantic, OpenAI Python SDK |
| Models | OpenAI GPT-4o, or Gemma 3 12B via Ollama's OpenAI-compatible API |
| Frontend | React 19, Vite |

## Project structure

```
academic-chat-bot/
├── backend/
│   ├── main.py            # FastAPI app using OpenAI GPT-4o
│   ├── main_ollama.py     # Same API using a local Ollama model
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── App.jsx        # Chat UI, calls POST /chat
    │   └── components/
    └── package.json
```

## Getting started

### 1. Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
```

**Option A: OpenAI GPT-4o**

```bash
copy .env.example .env        # macOS/Linux: cp .env.example .env
# put your key in .env as OPENAI_API_KEY=...
uvicorn main:app --reload
```

**Option B: local model with Ollama**

```bash
ollama pull gemma3:12b
uvicorn main_ollama:app --reload
```

The API runs at `http://127.0.0.1:8000` and interactive docs are at `http://127.0.0.1:8000/docs`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## API

`POST /chat`

```json
{
  "messages": [
    { "role": "user", "content": "this thing is really important for the results" }
  ]
}
```

Example response:

```json
{ "response": "This factor is of considerable significance to the results." }
```

`GET /health` (Ollama version only) returns the status and the model name.

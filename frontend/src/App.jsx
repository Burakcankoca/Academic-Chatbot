import { useState } from "react";
import "./App.css";

export default function App() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Merhaba 👋 nasıl yardımcı olabilirim?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Backend error:", data);
        throw new Error(data.detail || "Bilinmeyen sunucu hatası");
      }

      setMessages((prev) => [...prev, { role: "bot", text: data.response }]);
    } catch (error) {
      console.error("Fetch/OpenAI error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `Hata: ${error.message}` },
      ]);
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Academic ChatBot</h2>
        <div className="chat-list">
          <div className="chat-item active">Genel Sohbet</div>
          <div className="chat-item">Destek</div>
        </div>
      </aside>

      <main className="chat-container">
        <header className="chat-header">
          <h3>Genel Sohbet</h3>
          <span className="status">● Online</span>
        </header>

        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesaj yaz..."
          />
          <button onClick={sendMessage}>Gönder</button>
        </div>
      </main>
    </div>
  );
}

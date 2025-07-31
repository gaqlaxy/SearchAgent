import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    {
      type: "user",
      text: "Best IEM under $50",
      timestamp: Date.now(),
    },
    {
      type: "assistant",
      summary:
        "Here are some top picks under $50 based on Reddit and blog discussions...",
      products: [],
      sources: [],
      timestamp: Date.now(),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (text) => {
    const timestamp = Date.now();
    setMessages((prev) => [...prev, { type: "user", text, timestamp }]);
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: text }),
      });

      const data = await res.json();
      console.log("Frontend received data:", data);

      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          summary: data.summary,
          products: data.products,
          sources: data.sources,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          summary: "⚠️ Error fetching response. Please try again.",
          products: [],
          sources: [],
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            message={msg}
            onFollowUpClick={(text) => handleSend(text)}
          />
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center">
              A
            </div>
            <div className="text-sm bg-white px-4 py-2 rounded-xl shadow-sm animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}

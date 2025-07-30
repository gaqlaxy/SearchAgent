import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { type: "user", text: "Best IEM under $50" },
    {
      type: "assistant",
      summary:
        "Here are some top picks under $50 based on Reddit and blog discussions...",
      products: [
        /* ... */
      ],
      sources: [
        /* ... */
      ],
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
      </div>
      {/* <ChatInput
        onSend={(text) => {
          setMessages((prev) => [...prev, { type: "user", text }]);
          // Later: trigger API call here
        }}
      /> */}
      <ChatInput
        onSend={async (text) => {
          setMessages((prev) => [...prev, { type: "user", text }]);

          // Optional: Add a temporary loading message
          setMessages((prev) => [
            ...prev,
            {
              type: "assistant",
              summary: "⏳ Thinking...",
              products: [],
              sources: [],
            },
          ]);

          try {
            const res = await fetch("http://localhost:5000/api/query", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ query: text }),
            });

            const data = await res.json();

            // Replace the loading message with actual response
            setMessages((prev) => [
              ...prev.slice(0, -1),
              {
                type: "assistant",
                summary: data.summary,
                products: data.products,
                sources: data.sources,
              },
            ]);
          } catch (err) {
            // Replace loading message with error
            setMessages((prev) => [
              ...prev.slice(0, -1),
              {
                type: "assistant",
                summary: "⚠️ Error fetching response. Please try again.",
                products: [],
                sources: [],
              },
            ]);
          }
        }}
      />
    </div>
  );
}

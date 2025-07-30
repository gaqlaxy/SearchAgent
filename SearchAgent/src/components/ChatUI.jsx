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
      <ChatInput
        onSend={(text) => {
          setMessages((prev) => [...prev, { type: "user", text }]);
          // Later: trigger API call here
        }}
      />
    </div>
  );
}

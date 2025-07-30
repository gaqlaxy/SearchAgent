import React, { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 border-t bg-white flex items-center gap-2">
      <input
        type="text"
        className="flex-1 border rounded px-3 py-2"
        placeholder="Ask something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
}

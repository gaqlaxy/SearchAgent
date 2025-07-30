// src/App.jsx
import React from "react";
import ChatUI from "./components/ChatUI";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow p-4 text-xl font-semibold text-center text-gray-800">
        AI Product Advisor 🔍
      </header>
      <main>
        <ChatUI />
      </main>
    </div>
  );
}

export default App;

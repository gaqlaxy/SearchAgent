import React from "react";
import SummarySection from "./SummarySection";
import ProductCards from "./ProductCards";
import SourceLinks from "./SourceLinks";

export default function ChatMessage({ message }) {
  if (message.type === "user") {
    return (
      <div className="text-right px-4 py-2 bg-white rounded-lg shadow self-end max-w-lg">
        {message.text}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow self-start max-w-2xl">
      <SummarySection summary={message.summary} />
      {message.products && <ProductCards products={message.products} />}
      {message.sources && <SourceLinks sources={message.sources} />}
    </div>
  );
}

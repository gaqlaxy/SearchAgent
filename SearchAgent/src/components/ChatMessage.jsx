import React from "react";
import SummarySection from "./SummarySection";
import ProductCards from "./ProductCards";
import SourceLinks from "./SourceLinks";

export default function ChatMessage({ message }) {
  if (message.type === "user") {
    return (
      <div className="text-right">
        <div className="inline-block bg-blue-200 text-blue-800 px-4 py-2 rounded">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="text-left space-y-2">
      <div className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded">
        {message.summary}
      </div>

      {message.products?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {message.products.map((product, idx) => (
            <div key={idx} className="p-4 border rounded shadow bg-white">
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.reason}</p>
              {product.link && (
                <a
                  href={product.link}
                  target="_blank"
                  className="text-blue-600 underline text-sm mt-2 inline-block"
                >
                  View Product
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {message.sources?.length > 0 && (
        <div className="text-xs text-gray-500">
          Sources:{" "}
          {message.sources.map((url, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline mr-2"
            >
              [Link {idx + 1}]
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

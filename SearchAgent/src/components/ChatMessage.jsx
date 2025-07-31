import React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function ChatMessage({ message, onFollowUpClick }) {
  console.log("Rendering message:", message);
  const isUser = message.type === "user";
  const avatarText = isUser ? "U" : "A";
  const bubbleColor = isUser
    ? "bg-blue-200 text-blue-800"
    : "bg-gray-200 text-gray-800";
  const align = isUser ? "justify-end" : "justify-start";
  const time = message.timestamp
    ? format(new Date(message.timestamp), "hh:mm a")
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${align} mb-6`}
    >
      {!isUser && (
        <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center mr-2">
          {avatarText}
        </div>
      )}

      <div className="max-w-xl space-y-3">
        <div className={`inline-block px-4 py-3 rounded-xl ${bubbleColor}`}>
          {isUser ? <p>{message.text}</p> : <p>{message.summary}</p>}
        </div>

        {!isUser && message.products?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {message.products.map((product, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-xl shadow-sm bg-white space-y-1"
              >
                <h4 className="font-semibold text-base">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.reason}</p>
                {product.link && (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm inline-block mt-1"
                  >
                    View Product
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {!isUser && message.sources?.length > 0 && (
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

        {/* {!isUser && message.followups?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.followups.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onFollowUpClick(suggestion)}
                className="text-sm px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-full transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )} */}

        {!isUser && message.followups?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {console.log("Rendering followups:", message.followups)}
            {message.followups.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onFollowUpClick(suggestion)}
                className="text-sm px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-full transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-400 mt-1">{time}</div>
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center ml-2">
          {avatarText}
        </div>
      )}
    </motion.div>
  );
}

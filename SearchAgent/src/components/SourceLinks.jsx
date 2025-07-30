import React from "react";

export default function SourceLinks({ sources }) {
  return (
    <div>
      <p className="font-medium text-gray-800">📚 Sources:</p>
      <ul className="list-disc list-inside text-sm text-blue-600">
        {sources.map((src, i) => (
          <li key={i}>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {src}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

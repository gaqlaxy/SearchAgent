import React from "react";

export default function SummarySection({ summary }) {
  return (
    <div className="mb-4">
      <p className="font-medium text-gray-800">🎯 Summary:</p>
      <p className="text-gray-700 mt-1">{summary}</p>
    </div>
  );
}

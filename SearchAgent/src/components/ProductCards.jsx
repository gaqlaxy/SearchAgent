import React from "react";

export default function ProductCards({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      {products.map((product, i) => (
        <div key={i} className="border rounded-lg p-3 bg-white shadow-sm">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.pros}</p>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            View Source 🔗
          </a>
        </div>
      ))}
    </div>
  );
}

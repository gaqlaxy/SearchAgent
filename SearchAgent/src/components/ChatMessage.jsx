// import React from "react";
// import SummarySection from "./SummarySection";
// import ProductCards from "./ProductCards";
// import SourceLinks from "./SourceLinks";

// export default function ChatMessage({ message }) {
//   if (message.type === "user") {
//     return (
//       <div className="text-right">
//         <div className="inline-block bg-blue-200 text-blue-800 px-4 py-2 rounded">
//           {message.text}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="text-left space-y-2">
//       <div className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded">
//         {message.summary}
//       </div>

//       {message.products?.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {message.products.map((product, idx) => (
//             <div key={idx} className="p-4 border rounded shadow bg-white">
//               <h4 className="font-semibold">{product.name}</h4>
//               <p className="text-sm text-gray-600">{product.reason}</p>
//               {product.link && (
//                 <a
//                   href={product.link}
//                   target="_blank"
//                   className="text-blue-600 underline text-sm mt-2 inline-block"
//                 >
//                   View Product
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {message.sources?.length > 0 && (
//         <div className="text-xs text-gray-500">
//           Sources:{" "}
//           {message.sources.map((url, idx) => (
//             <a
//               key={idx}
//               href={url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline mr-2"
//             >
//               [Link {idx + 1}]
//             </a>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// ChatMessage.jsx
import React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function ChatMessage({ message }) {
  const isUser = message.type === "user";
  const avatar = isUser ? "U" : "A";
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
      className={`flex ${align} mb-4`}
    >
      {!isUser && (
        <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center mr-2">
          {avatar}
        </div>
      )}

      <div className="max-w-xl space-y-2">
        <div className={`inline-block px-4 py-2 rounded-xl ${bubbleColor}`}>
          {isUser ? <p>{message.text}</p> : <p>{message.summary}</p>}
        </div>

        {!isUser && message.products?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {message.products.map((product, idx) => (
              <div key={idx} className="p-4 border rounded shadow bg-white">
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.reason}</p>
                {product.link && (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm mt-2 inline-block"
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

        <div className="text-xs text-gray-400 mt-1">{time}</div>
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center ml-2">
          {avatar}
        </div>
      )}
    </motion.div>
  );
}

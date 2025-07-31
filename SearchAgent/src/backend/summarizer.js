// // summarizer.js
// import axios from "axios";



// export async function summarizeWithGroq(posts) {

//     const prompt = `
// You must respond with ONLY a JSON object. Do not include any explanations, markdown, or other text.

// Summarize the following Reddit discussions and suggest 3 best products with reasoning.

// Return this exact JSON format:
// {
//   "text": "summary of the threads",
//   "products": [
//     { "name": "Product 1", "reason": "Why it's good", "link": "optional" },
//     { "name": "Product 2", "reason": "Why it's good", "link": "optional" },
//     { "name": "Product 3", "reason": "Why it's good", "link": "optional" }
//   ]
// }

// Content to analyze:
// ${posts.map(p => `Title: ${p.title}\nContent: ${p.selftext}`).join("\n\n")}
// `;



//     console.log("Prompt length:", prompt.length);

//     const response = await axios.post(
//         // "https://api.groq.com/openai/v1/chat/completions",
//         "https://api.groq.com/openai/v1/chat/completions",

//         {
//             // model: "mixtral-8x7b-32768",
//             model: "llama3-70b-8192",
//             messages: [{ role: "user", content: prompt }],
//         },
//         {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${process.env.GROQ_API_KEY} `,
//             },
//         }
//     );



//     const content = response.data.choices[0].message.content;

//     // Enhanced cleaning: handle multiple response formats
//     let cleaned = content;

//     // Remove code blocks (```json ... ```)
//     const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
//     const codeBlockMatch = content.match(codeBlockRegex);
//     if (codeBlockMatch) {
//         cleaned = codeBlockMatch[1];
//     } else {
//         // Try to extract JSON from text that starts with explanations
//         const jsonRegex = /\{[\s\S]*\}/;
//         const jsonMatch = content.match(jsonRegex);
//         if (jsonMatch) {
//             cleaned = jsonMatch[0];
//         }
//     }

//     console.log("Cleaned Content:", cleaned);

//     try {
//         return JSON.parse(cleaned.trim());
//     } catch (err) {
//         console.error("Parse Error:", err.message);
//         console.error("Raw content:", content); // Log raw content for debugging
//         return {
//             text: "Failed to parse summary.",
//             products: [],
//         };
//     }
// }


// summarizer.js
import axios from "axios";

export async function summarizeWithGroq(posts) {

    const truncatedPosts = posts.map(p => ({
        title: p.title,
        selftext: p.selftext ? p.selftext.substring(0, 1000) : "" // Limit to 1000 chars per post
    }));

    const prompt = `
You must respond with ONLY a JSON object. Do not include any explanations, markdown, or other text.

Summarize the following Reddit discussions and suggest 3 best products with reasoning.

Return this exact JSON format:
{
  "text": "summary of the threads",
  "products": [
    { "name": "Product 1", "reason": "Why it's good", "link": "optional" },
    { "name": "Product 2", "reason": "Why it's good", "link": "optional" },
    { "name": "Product 3", "reason": "Why it's good", "link": "optional" }
  ]
}

Content to analyze:
${truncatedPosts.map((p) => `Title: ${p.title}\nContent: ${p.selftext}`).join("\n\n")}
`;

    console.log("Prompt length:", prompt.length);

    const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            model: "llama3-70b-8192",
            messages: [{ role: "user", content: prompt }],
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            },
        }
    );

    const content = response.data.choices[0].message.content;
    console.log("Raw Groq response:", content);

    // Clean up JSON from response
    let cleaned = content;

    const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
    const codeBlockMatch = content.match(codeBlockRegex);
    if (codeBlockMatch) {
        cleaned = codeBlockMatch[1];
    } else {
        const jsonRegex = /\{[\s\S]*\}/;
        const jsonMatch = content.match(jsonRegex);
        if (jsonMatch) {
            cleaned = jsonMatch[0];
        }
    }

    try {
        // return JSON.parse(cleaned.trim());
        const parsed = JSON.parse(cleaned.trim());
        console.log("Parsed result:", parsed);
        return parsed;
    } catch (err) {
        console.error("Parse Error:", err.message);
        console.error("Raw content:", content);
        return {
            text: "Failed to parse summary.",
            products: [],
        };
    }
}

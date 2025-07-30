// summarizer.js
import axios from "axios";



export async function summarizeWithGroq(posts) {
    const prompt = `
Summarize the following Reddit discussions and suggest 3 best products with reasoning.


Return ONLY valid minified JSON in the following format — no explanations, no markdown, just JSON:
{
  "text": "summary of the threads",
  "products": [
    { "name": "Product 1", "reason": "Why it's good", "link": "optional" },
    { "name": "Product 2", "reason": "Why it's good", "link": "optional" },
    { "name": "Product 3", "reason": "Why it's good", "link": "optional" }
  ]
}

Content to analyze:
${posts.map(p => `Title: ${p.title}\nContent: ${p.selftext}`).join("\n\n")}
`;




    console.log("Prompt length:", prompt.length);

    const response = await axios.post(
        // "https://api.groq.com/openai/v1/chat/completions",
        "https://api.groq.com/openai/v1/chat/completions",

        {
            // model: "mixtral-8x7b-32768",
            model: "llama3-70b-8192",
            messages: [{ role: "user", content: prompt }],
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GROQ_API_KEY} `,
            },
        }
    );

    const content = response.data.choices[0].message.content;

    // FIX: Remove ```json ... ``` code block if it exists
    const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
    const match = content.match(codeBlockRegex);
    const cleaned = match ? match[1] : content;

    console.log("Cleaned Content:", cleaned);

    try {
        return JSON.parse(cleaned.trim());
    } catch (err) {
        console.error("Parse Error:", err.message);
        return {
            text: "Failed to parse summary.",
            products: [],
        };
    }
}

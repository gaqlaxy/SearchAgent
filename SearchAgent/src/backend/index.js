// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getRedditResults } from "./reddit.js";
import { summarizeWithGroq } from "./summarizer.js";

dotenv.config();
console.log("Loaded GROQ Key:", process.env.GROQ_API_KEY);
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
console.log("GROQ KEY:", process.env.GROQ_API_KEY?.slice(0, 6) + "...")

// app.post("/api/query", async (req, res) => {
//     console.log("Received query:", req.body);
//     const { prompt } = req.body;
//     try {
//         const redditResults = await getRedditResults(prompt);
//         const summary = await summarizeWithGroq(redditResults);

//         res.json({
//             summary: summary.text,
//             products: summary.products,
//             sources: redditResults.map(r => r.url),
//         });
//     } catch (err) {
//         console.error("Error:", err.message);
//         res.status(500).json({ error: "Something went wrong" });
//     }
// });


app.post("/api/query", async (req, res) => {
    const { query } = req.body;
    console.log("Received query:", query);

    try {
        console.log("Fetching Reddit results...");
        const redditResults = await getRedditResults(query);
        console.log("Reddit results:", redditResults);

        console.log("Summarizing with Groq...");
        const summary = await summarizeWithGroq(redditResults);
        console.log("Groq Summary:", summary);

        res.json({
            summary: summary.text,
            products: summary.products,
            sources: redditResults.map((r) => r.url),
        });
    } catch (err) {
        console.error("Error occurred:", err.response?.data || err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

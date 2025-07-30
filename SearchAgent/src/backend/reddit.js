// reddit.js
import axios from "axios";

export async function getRedditResults(query) {
    const searchUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&limit=5`;

    const res = await axios.get(searchUrl);
    const posts = res.data.data.children;

    return posts.map(p => ({
        title: p.data.title,
        url: `https://www.reddit.com${p.data.permalink}`,
        selftext: p.data.selftext || "",
    }));
}

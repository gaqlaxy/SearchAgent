import fetch from 'node-fetch';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cheerio = require('cheerio');
import fs from 'fs';


const URL = 'https://crinacle.com/rankings/iems/';

async function scrapeCrinacle() {
    try {
        const response = await fetch(URL);
        const body = await response.text();
        const $ = cheerio.load(body);

        const products = [];

        $('table tbody tr').each((i, el) => {
            const rank = $(el).find('td').eq(0).text().trim();
            const name = $(el).find('td').eq(1).text().trim();
            const notes = $(el).find('td').eq(2).text().trim();

            if (rank && name) {
                products.push({ name, rank, notes });
            }
        });

        fs.writeFileSync('data/crinacle.json', JSON.stringify(products, null, 2));
        console.log(`✅ Scraped ${products.length} IEMs from Crinacle.`);

    } catch (err) {
        console.error('❌ Crinacle scrape failed:', err);
    }
}

scrapeCrinacle();

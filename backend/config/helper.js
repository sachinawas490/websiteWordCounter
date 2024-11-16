const { convert } = require('html-to-text');
const axios = require('axios');

function isString(value) {
    return typeof value === 'string';
}

async function helper(url) {
    console.log("Fetching URL:", url);

    try {
        const response = await axios.get(url);
        const options = {
            wordwrap: 130, // Option for `html-to-text`
        };

        const text = convert(response.data, options)
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ');

        console.log(`Extracted ${text.length} words from the page.`);

        let count = 0;
        for (let word of text) {
            if (isString(word) && word.length <= 15 && word !== '*' && word.length !== 0) {
                count++;
            }
        }

        console.log(`Valid word count for ${url}:`, count);

        return { wordCount: count };
    } catch (error) {
        console.error(`Error fetching or processing URL (${url}):`, error.message);
        throw new Error(`Failed to process URL (${url}): ${error.message}`);
    }
}

module.exports = { helper };

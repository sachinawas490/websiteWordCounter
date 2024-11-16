const { helper } = require('../config/helper');

const urlController = async (req, res) => {
    try {
        const { data } = req.body; // Expecting an array of URLs
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ error: "Invalid or empty data array" });
        }

        console.log("Received URLs:", data);

        const results = [];
        for (const url of data) {
            console.log("Processing URL:", url);
            try {
                const result = await helper(url); // Fetch and process URL
                results.push({ url, ...result });
            } catch (helperError) {
                console.error(`Error processing URL (${url}):`, helperError.message);
                results.push({ url, error: helperError.message });
            }
        }

        console.log("Final Results:", results);
        res.status(200).json({ message: "Data processed successfully!", results });
    } catch (error) {
        console.error("Error in urlController:", error.message);
        res.status(500).json({ error: "Something went wrong on the server" });
    }
};

module.exports = { urlController };

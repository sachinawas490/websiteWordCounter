const axios =require('axios')
const {JSDOM}=require('jsdom');
const {Readability}=require("@mozilla/readability");

const processUrlsController = async (req, res) => {
  try {
    const { data:urls}=req.body;
    if (!Array.isArray(urls)||urls.length===0) {
      return res.status(400).json( { error: "input is empty" });
    }

    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const { data: html } = await axios.get(url);

          const dom = new JSDOM(html, { url });

          const reader = new Readability(dom.window.document);
          const article = reader.parse();

          if (!article) {
            throw new Error("no data found(readable)");
          }

          const cleanText = article.textContent.replace(/\s+/g, " "); // this is replacing multiple space into single

          // Calculate word count from cleaned text
          const wordCount = cleanText.split(" ").length;

          // Return the processed data
          return {
            url,
            title: article.title,
            wordCount,
            cleanText,
          };
        }catch (err) {
          return { url, error: err.message };
        }
      })
    );

    // Step 3: Send the response
    res.status(200).json({
      message: "URLs processed successfully",
      results,
    });
  } catch (error) {
    
    console.error("Error in processUrlsController:", error.message);
    res.status(500).json({error: "internal server error"});
  }
};

module.exports={processUrlsController };

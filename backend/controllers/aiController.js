const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
    blogPostIdeasPrompt,
    generateReplyPrompt,
    blogSummaryPrompt,
} = require("../utils/prompts");

// Initialize Gemini AI
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper to call Gemini safely
const generateTextFromPrompt = async (prompt, modelName = "gemini-2.0-flash-lite") => {
    const model = ai.getGenerativeModel({ model: modelName });
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    return await response.text();
};

// === 1. Generate Full Blog Post ===
const generateBlogPost = async (req, res) => {
    try {
        const { title, tone } = req.body;
        if (!title || !tone) {
            return res.status(400).json({ message: "Title and tone are required" });
        }

        const prompt = `Write a markdown-formatted blog post with the title "${title}" in a ${tone} tone. Include an introduction, subheadings, code examples if applicable, and a conclusion. Ensure the content is engaging and informative.`;

        const text = await generateTextFromPrompt(prompt);
        res.status(200).json({ content: text });

    } catch (error) {
        console.error("Error generating blog post:", error);
        res.status(500).json({ message: "Error generating blog post", error: error.message });
    }
};

// === 2. Generate Blog Post Ideas ===
const generateBlogPostIdeas = async (req, res) => {
    try {
        const { topics } = req.body;
        if (!topics) {
            return res.status(400).json({ message: "Topic is required" });
        }

        const prompt = blogPostIdeasPrompt(topics);
        const text = await generateTextFromPrompt(prompt);

        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);

    } catch (error) {
        console.error("Error generating blog post ideas:", error);
        res.status(500).json({ message: "Error generating blog post ideas", error: error.message });
    }
};

// === 3. Generate Reply to Comment ===
const generateCommentReply = async (req, res) => {
    try {
        const { author, comment } = req.body;
        if (!comment) {
            return res.status(400).json({ message: "Comment is required" });
        }

        const prompt = generateReplyPrompt({ author, comment });
        const text = await generateTextFromPrompt(prompt);

        res.status(200).json(text);

    } catch (error) {
        console.error("Error generating comment reply:", error);
        res.status(500).json({ message: "Error generating comment reply", error: error.message });
    }
};

// === 4. Generate Summary for Blog Post ===
const generatePostSummary = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content || content.length < 20) {
            return res.status(400).json({ message: "Content is too short to summarize" });
        }

        const prompt = blogSummaryPrompt(content);
        const text = await generateTextFromPrompt(prompt, "gemini-1.5-pro");

        res.status(200).json({ summary: text });

    } catch (error) {
        console.error("Error generating post summary:", error);
        res.status(500).json({ message: "Error generating post summary", error: error.message });
    }
};

// === Export All ===
module.exports = {
    generateBlogPost,
    generateBlogPostIdeas,
    generateCommentReply,
    generatePostSummary,
};

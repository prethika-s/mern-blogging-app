const blogPostIdeasPrompt = (topic) => `
    Generate a list of 5 blog post ideas related to the topic "${topic}".

For each blog post idea, provide:
- a title
- a brief description (1-2 sentences)
- 3 relevant tags
- the tone (e.g., technical, casual, professional, etc.)

Return the result as an array of JSON objects in this format:
[
    {
        "title": "",
        "description": "",
        "tags": ["", "", ""],
        "tone": ""
    },
]

Important: Do NOT add any extra text outside the JSON format. Only return the JSON array. `;

function generateReplyPrompt(comment, postTitle) {
    const authorName = comment.author?.name || "User";
    const content = comment.content;

    return `You're replying to a blog comment by ${authorName} on the post titled "${postTitle}".
The comment is: "${content}"

Reply in one clear, natural sentence, directly to the comment.

Instructions:
- If it's a **question**, answer helpfully.
- If it's **positive or appreciative**, thank them politely.
- If it's **negative or rude**, stay respectful.
- Do **not** give multiple replies, markdown, or descriptions.
- Output **exactly one sentence**, under 20 words.`;
}


const blogSummaryPrompt = (blogContent) => (`
    You are an AI assistant tasked with summarizing blog posts.
    
    Instructions:
    - Read the provided blog content carefully.
    - Generate a short, catchy, SEO-friendly title (max 12 words).
    - write a clear, engaging summary of about 300 words.
    - At the end of the summary, add a markdown section **## what you will learn**.
    - Under that heading, list 3-5 key takeaways in bullet points.
    
    Return the result in **valid JSON** with the following structure:
    
    {
        "title": "Short SEO-friendly title",
        "summary": "300-word summary with a markdown section of What you will learn",
        "keyTakeaways": [
            "First key takeaway",
            "Second key takeaway",
            "Third key takeaway"
        ]
    }
        Only return valid JSON. Do not include markdown or code blocks around the JSON.
        
        Blog Post Content:
        ${blogContent}
        `);

module.exports = { blogPostIdeasPrompt, generateReplyPrompt, blogSummaryPrompt };
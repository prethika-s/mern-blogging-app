const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
    {
        title:{type: String, required: true},
        slug:{type: String, required: true, unique: true},
        content:{type: String, required: true},
        coverImageUrl:{type: String, default: null},
        tags:[{type: String}],
        author:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        isDraft:{type: Boolean, default: false},
        views:{type: Number, default: 0},
        likes:{type: Number, default: 0},
        generatedByAI:{type: Boolean, default: false},
        comments:[{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
    },
    {timestamps: true}
);

module.exports = mongoose.model("BlogPost", BlogPostSchema);
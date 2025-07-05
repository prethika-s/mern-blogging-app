const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        post: {type: mongoose.Schema.Types.ObjectId, ref:"BlogPost", required: true},
        author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        content: {type: String, required: true},
        parentComment: {type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Comment", CommentSchema);
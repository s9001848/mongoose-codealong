const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    header: String,
    content: String,
    date: Date
});

const postSchema = new Schema({
    title: String,
    body: String,
    comments: [commentSchema]
});

const Post = mongoose.model('Post', postSchema);

// make this available to our other files
module.exports = Post;

import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  message: String,
  creator: String,
  name: String,
});

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comments: [commentSchema],
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;

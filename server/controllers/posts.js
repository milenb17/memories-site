import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  }
  catch (errorr) {
    res.status(404).json({message: error.message});
  }
}

export const createPost = async(req, res) => {
  const post = req.body;
  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
  try {
    await newPost.save()
    res.status(201).json(newPost);
  }
  catch (error) {
    res.status(409).json({message: error.message});
  }
}

export const updatePost = async(req, res) => {
  const id = req.params.id;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, {...post, _id: id}, {new: true});
  res.json(updatedPost);
}

export const deletePost = async(req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  await PostMessage.findByIdAndRemove(id);
  res.json({message: 'Post deleted successfully'});
}

export const likePost = async(req, res) => {
  // post id
  const id = req.params.id;
  if (!req.userId) {
    return res.json({message: 'Unauthenticated'})
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  const post = await PostMessage.findById(id);

  // check if user has already liked post 
  const index = post.likes.findIndex((likeId) => likeId == String(req.userId));
  if (index == -1 ) {
    post.likes.push(req.userId);
  } else  {
    post.likes = post.likes.filter((likeId) => likeId != String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
  res.json(updatedPost);
}
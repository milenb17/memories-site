import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// for each request, if a user is signed in, add their token to req.headers so the backend can access it
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const fetchPosts = () => {
  return API.get("/posts");
};

export const fetchPost = (id) => {
  return API.get(`/posts/${id}`);
};

export const createPost = (newPost) => {
  return API.post("/posts", newPost);
};
export const updatePost = (currentId, updatedPost) => {
  return API.patch(`/posts/${currentId}`, updatedPost);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

export const likePost = (currentId) => {
  return API.patch(`/posts/${currentId}/like`);
};

// currentId is postId
export const createComment = (currentId, comment) => {
  return API.patch(`/posts/${currentId}/comment`, comment);
};

export const logIn = (formData) => {
  return API.post(`/users/login`, formData);
};
export const signUp = (formData) => {
  return API.post(`/users/signup`, formData);
};

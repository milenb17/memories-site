import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:8080'})

// for each request, if a user is signed in, add their token to req.headers so the backend can access it
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
})
export const fetchPosts = () => {
  return API.get('/posts');
}

export const createPost = (newPost) => {
  return API.post('/posts', newPost);
}
export const updatePost = (currentId, updatedPost) => {
  return API.patch(`/posts/${currentId}`, updatedPost);
}

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
}

export const likePost = (currentId) => {
  return API.patch(`/posts/${currentId}/like`);
}

export const logIn = (formData) => {
  return API.post(`/users/login`, formData);
}
export const signUp = (formData) => {
  return API.post(`/users/signup`, formData);
}
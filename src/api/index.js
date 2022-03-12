import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

const HEROKUAPI = axios.create({
  baseURL: "https://aeum1016-memories-project.herokuapp.com",
});

let heroku = false;
const CURAPI = heroku ? HEROKUAPI : API;

CURAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// export const fetchPosts = () => CURAPI.get("/posts");
// export const createPost = (newPost) => CURAPI.post("/posts", newPost);
// export const likePost = (id) => CURAPI.patch(`/posts/${id}/likePost`);
// export const updatePost = (currentId, updatedPost) =>
//   CURAPI.patch(`/posts/${currentId}`, updatedPost);
// export const deletePost = (id) => CURAPI.delete(`/posts/${id}`);

export const signIn = (formData) => CURAPI.post("/user/signin", formData);
export const signUp = (formData) => CURAPI.post("/user/signup", formData);

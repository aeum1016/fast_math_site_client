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

export const fetchAttempts = () => CURAPI.get("/attempts");
export const createPost = (newAttempt) => CURAPI.post("/attempts", newAttempt);
export const fetchUserAttempts = (email) => CURAPI.patch(`/attempts/${email}`);

export const signIn = (formData) => CURAPI.post("/user/signin", formData);
export const signUp = (formData) => CURAPI.post("/user/signup", formData);

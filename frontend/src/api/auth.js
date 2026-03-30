import axios from "axios";

const API = axios.create({
  baseURL: "https://prepgenius-xrx9.onrender.com/api/auth",
});

// Register
export const registerUser = (data) => API.post("/register", data);

// Login
export const loginUser = (data) => API.post("/login", data);
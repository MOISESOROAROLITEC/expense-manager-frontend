import axios from "axios";

const baseURL = "http://localhost:3000/graphql";

const Axios = axios.create({
  baseURL, headers: {
    'Content-Type': 'application/json',
  }
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;

import axios from "axios";
import interceptors from "./interceptors.js";

const instance = axios.create({
  baseURL: process.env.VUE_APP_WP_API_URL
});

interceptors(instance);

export default instance;

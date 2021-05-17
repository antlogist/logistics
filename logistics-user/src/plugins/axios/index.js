import axios from "axios";
import interceptors from "./interceptors.js";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL_PODLESNYY
});

interceptors(instance);

export default instance;

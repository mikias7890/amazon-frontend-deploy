import axios from "axios";
const axiosinstance = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-9e96c/us-central1/api",
  baseURL: "https://amazon-api-deploy-q70k.onrender.com",
});
export { axiosinstance };

import axios from "axios";
const axiosinstance = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-9e96c/us-central1/api",
});
export { axiosinstance };

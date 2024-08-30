import axios from "axios";
import configurations from "../../config";

const api = axios.create({
  baseURL: configurations.backendUrl,
  withCredentials: true,
});

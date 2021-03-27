import axios from "axios";

const instance = axios.create({
  baseURL: "https://asia-east2-socail-media-app-2020.cloudfunctions.net/api",
});

export default instance;

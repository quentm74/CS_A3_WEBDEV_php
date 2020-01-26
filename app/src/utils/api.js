import axios from "axios";
import {API_BASE_URL} from "./consts";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {}
});

export const post = (url, data, onSuccess, onError) => {
  instance.post(url, data)
    .then((response) => {
      console.log("[API] [SUCCESS]", response);
      onSuccess(response.data);
    })
    .catch((error) => {
      console.log("[API] [ERROR]", error);
      onError(error);
    });
};

export const responseTypes = Object.freeze({
  "SUCCESS": 0,
  "ERROR": 1,
});
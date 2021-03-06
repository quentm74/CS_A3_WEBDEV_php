import axios from "axios";
import {API_BASE_URL} from "./consts";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {},
});

export const http_get = (url, onSuccess, onError) => {
  instance.get(url)
    .then((response) => {
      console.log("[API] [SUCCESS]", response);
      onSuccess(response.data);
    })
    .catch((error) => {
      if (error.response) {
        console.log("[API] [ERROR]", error.response);
        onError(error.response);
      }
    });
};

export const http_post = (url, data, onSuccess, onError) => {
  instance.post(url, data)
    .then((response) => {
      console.log("[API] [SUCCESS]", response);
      onSuccess(response.data);
    })
    .catch((error) => {
      if (error.response) {
        console.log("[API] [ERROR]", error.response);
        onError(error.response);
      }
    });
};

export const http_delete = (url, data, onSuccess, onError) => {
  instance.delete(url, {
    data: data,
  })
    .then((response) => {
      console.log("[API] [SUCCESS]", response);
      onSuccess(response.data);
    })
    .catch((error) => {
      if (error.response) {
        console.log("[API] [ERROR]", error.response);
        onError(error.response);
      }
    });
};

export const responseTypes = Object.freeze({
  "SUCCESS": 0,
  "ERROR": 1,
});
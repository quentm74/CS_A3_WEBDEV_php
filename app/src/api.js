import {AxiosInstance as axios} from "axios";
import {API_BASE_URL} from "./consts";

export const post = (url, data, onSuccess, onError) => {
    axios.post(API_BASE_URL + url, data)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const responseTypes = Object.freeze({
    "SUCCESS": 0,
    "ERROR": 1,
});
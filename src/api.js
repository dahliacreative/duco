/* istanbul ignore file */
import axios from "axios";
import fixtures from "./fixtures";

const api = axios.create({
  baseURL: "https://swapi.co/api/"
});

const get = path => {
  if (process.env.NODE_ENV === "test") {
    return new Promise(resolve => {
      resolve(fixtures[path]);
    });
  }
  return api.get(path);
};

export default {
  get
};

import axios from "./axios";

export async function userLogin(credentials) {
  return axios.post("user/login", credentials)
    .then((response) => response)
    .catch((error) => {
      console.error("There was an error!", error);
    });
}


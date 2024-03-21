import axios from "axios";
import { getEnvVariable } from "../helpers/getEnvVariable";

const {
  VITE_SANIT_API_URL,
  VITE_SANIT_USER,
  VITE_SANIT_PASSWORD,
  VITE_SANIT_X_API_KEY,
  VITE_SANIT_ID_APP,
} = getEnvVariable();
console.log(
  VITE_SANIT_API_URL,
  VITE_SANIT_USER,
  VITE_SANIT_PASSWORD,
  VITE_SANIT_X_API_KEY,
  VITE_SANIT_ID_APP
);
const ApiSanit = () => {
  const url = `${VITE_SANIT_API_URL}main/login`;
  const username = VITE_SANIT_USER;
  const password = VITE_SANIT_PASSWORD;
  const credentials = `${username}:${password}`;
  const authHeader = `Basic ${btoa(credentials)}`;

  const config = {
    headers: {
      Authorization: authHeader,
      "x-api-key": VITE_SANIT_X_API_KEY,
    },
  };
  const data = {
    appID: VITE_SANIT_ID_APP,
  };

  axios
    .post(url, data, config)
    .then((response) => {
      console.log(response);
      const pragmaHeader = response.headers.pragma;
      console.log(pragmaHeader);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default ApiSanit;

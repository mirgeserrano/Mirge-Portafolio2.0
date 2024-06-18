import axios from "axios";
import { getEnvVariable } from "../helpers";

const {
  VITE_SANIT_API_URL,
  VITE_SANIT_USER,
  VITE_SANIT_PASSWORD,
  VITE_SANIT_X_API_KEY,
  VITE_SANIT_ID_APP,
} = getEnvVariable();

const ApiSanit = axios.create({
  baseURL: VITE_SANIT_API_URL,
});

ApiSanit.interceptors.request.use((config) => {
  const username = VITE_SANIT_USER;
  const password = VITE_SANIT_PASSWORD;
  const credentials = `${username}:${password}`;
  const authHeader = `Basic ${btoa(credentials)}`;

  config.headers = {
    ...config.headers,
    Authorization: authHeader,
    "x-api-key": VITE_SANIT_X_API_KEY,
  };

  config.data = {
    ...config.data,
    appID: VITE_SANIT_ID_APP,
  };

  return config;
});

export default ApiSanit;

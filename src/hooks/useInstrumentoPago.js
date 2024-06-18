import { getEnvVariable, useSetupAxiosInterceptors } from "../helpers";
import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import axios from "axios";
import { getToken } from "../helpers";

const { VITE_SANIT_API_URL } = getEnvVariable();

export const useInstrumentoPago = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configurar interceptores de Axios
  useSetupAxiosInterceptors(dispatch);

  const getIntrumentoPago = useCallback(async () => {
    setLoading(true);
    setError(null);

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/paymethods/`,
      headers: {
        Pragma: getToken(),
      },
    };
    try {
      const response = await axios.request(config);
      setData(response.data);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, getIntrumentoPago };
};

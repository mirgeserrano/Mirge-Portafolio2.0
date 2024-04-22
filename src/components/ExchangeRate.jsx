import axios from "axios";
import { useEffect, useState } from "react";

const ExchangeRate = () => {
  const [dolar, setDolar] = useState({});

  useEffect(() => {
    const ApiPyDolar = async () => {
      try {
        const response = await axios.get(
          "https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv"
        );

        const resp = response.data;
        setDolar(resp);
        return resp;
      } catch (error) {
        console.error(error);
      }
    };
    ApiPyDolar();
    const intervalId = setInterval(ApiPyDolar, 1800 * 1000);
    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  const { monitors } = dolar;
  const price = monitors && monitors.usd && monitors.usd.price;

  return (
    <div>
      <input
        className="flex-grow bg-gray-300 border border-transparent rounded-lg py-2 px-4  text-gray-700  focus:outline-none"
        name="dolar"
        value={price || ""}
        readOnly
      />
    </div>
  );
};

export default ExchangeRate;

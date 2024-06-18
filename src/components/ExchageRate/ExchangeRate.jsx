
import { useEffect, useState } from "react";
import { exchargeRateBCV } from "../../helpers";
import { updateDolarPrice } from "../../redux/features/multipleSlice";
import { useDispatch } from "react-redux";
import ExchageRateError from "./ExchageRateError";
import ExchageRateTrue from "./ExchageRateTrue";

const ExchangeRate = () => {
  const dispatch = useDispatch();
  const [editablePrice, setEditablePrice] = useState("");
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await exchargeRateBCV();
        const dolar = resp.monitors.usd.price || "";
        dispatch(updateDolarPrice(dolar));
        setEditablePrice(dolar);
        setApiError(false);
      } catch (error) {
        console.error(error);
        setApiError(true);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1800 * 1000);
    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [dispatch]);


  const handlePriceChange = (event) => {
    setEditablePrice(event.target.value);
    dispatch(updateDolarPrice(event.target.value));
    setApiError(false)
  };

  return (
    <div>
      {apiError ? (
        <ExchageRateError handlePriceChange={handlePriceChange} editablePrice={editablePrice} />
      ) : (
        <ExchageRateTrue handlePriceChange={handlePriceChange} editablePrice={editablePrice} />
      )}
    </div>
  );
};

export default ExchangeRate;

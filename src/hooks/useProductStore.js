import { addProduct } from "../redux/features/productSlice";
import axios from "axios";
import { getEnvVariable } from "../helpers/getEnvVariable";
import { useDispatch } from "react-redux";

const { VITE_SANIT_API_URL } = getEnvVariable();
export const useProductStore = () => {
  const dispach = useDispatch();
  const pragma = localStorage.getItem("userInfo");
  const sinComillas = pragma.replace(/"/g, "");

  const getProducts = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/product/`,
      headers: {
        Pragma: sinComillas,
      },
    };
    try {
      const response = await axios.request(config);
      const product = response.data;
      console.log(product);
      dispach(addProduct(product));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const productAgg = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/product/`,
      headers: {
        Pragma: sinComillas,
      },
    };
    try {
      const response = await axios.request(config);
      const product = response.data;
      console.log(product);
      //  dispach(addProduct(product))
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async () => {
    let data = JSON.stringify({
      appID: 1093,
    });
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/product/${id}`,
      headers: {
        Pragma: sinComillas,
      },
      data,
    };
    try {
      const response = await axios.request(config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { getProducts, deleteProduct, productAgg };
};

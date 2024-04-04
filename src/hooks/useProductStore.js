import { addProduct } from "../redux/features/productSlice";
import { getEnvVariable } from "../helpers/getEnvVariable";
import { setupAxiosInterceptors } from "../helpers/setupAxiosInterceptors";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getToken } from "../helpers/getToken";

const { VITE_SANIT_API_URL } = getEnvVariable();
export const useProductStore = () => {
  const dispach = useDispatch();
  const pragma = localStorage.getItem("userInfo");
  const sinComillas = pragma.replace(/"/g, "");

  setupAxiosInterceptors(dispach);


 const apiRequest = async (config) => {
   try {
     const response = await axios.request({
       ...config,
       headers: {
         ...config.headers,
         Pragma: getToken(),
       },
     });
     console.log(response);
     return response.data;
   } catch (error) {
    console.log(error);
     throw error;
   }
 };

   const getProducts = async () => {
     const config = {
       method: "get",
       url: `${VITE_SANIT_API_URL}adm/product/`,
     };

     return await apiRequest(config);
   };

 
  const productAgg = async () => {
    let config = {
      method: "get",
      url: `${VITE_SANIT_API_URL}adm/product/`,
    };
     return await apiRequest(config);
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

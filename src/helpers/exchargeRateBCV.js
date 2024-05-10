import axios from "axios";

const exchargeRateBCV = async () => {
  try {
    const response = await axios.get(
      "https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv"
    );
    const resp = response.data;
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export default exchargeRateBCV;

import axios from "axios";


export const ApiPyDolar = async () => {

 try {
        const response = await axios.get(
          "https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv"
        );
        // Manejar la respuesta de la petición
      //  console.log(response.data);
        return response.data
    } catch (error) {
        // Manejar el error en caso de que ocurra
        console.error(error);
    }
}




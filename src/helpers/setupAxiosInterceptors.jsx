// import axios from "axios";
// import { resetCustomerFailure } from "../redux/features/customerSlice";
// import { resetInvoice } from "../redux/features/invoiceSlice";
// import { resetProduct } from "../redux/features/productSlice";
// import { onLogout } from "../redux/features/authSlice";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// export const setupAxiosInterceptors = (dispatch) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interceptor = axios.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response && error.response.status === 403) {
//           console.log("error 403");
//           localStorage.clear();
//           console.log("La sesión ha expirado para la solicitud");
//           setTimeout(() => {
//             dispatch(
//               onLogout(
//                 "La Sesión ha expirado para la solicitud debe volver a ingresar"
//               )
//             );
//             navigate("/");
//           }, 1000);
//         } else if (error.response && error.response.status === 404) {
//           console.log("Error de servidor");
//         } else if (error.response && error.response.status === 500) {
//           alert("Error del servidor. Por favor, comuníquese con soporte.");
//           setTimeout(() => {
//             navigate("/");
//           }, 1000);
//         } else if (error.response && error.response.status === "ERR_FAILED") {
//           alert("Error del servidor. Por favor, comuníquese con soporte.");
//         } else if (error.response && error.response.status === "ha fallado") {
//           alert("Error del servidor. Por favor, comuníquese con soporte.");
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       const prueba = axios.interceptors.response.eject(interceptor);
//       console.log(prueba);
//     };
//   }, [dispatch, navigate]);
// };

import axios from "axios";
import { onLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const setupAxiosInterceptors = (dispatch) => {
  const navigate = useNavigate();

  const handleSessionExpired = () => {
    localStorage.clear();
    console.log("La sesión ha expirado para la solicitud");
    setTimeout(() => {
      dispatch(
        onLogout(
          "La Sesión ha expirado para la solicitud debe volver a ingresar"
        )
      );
      navigate("/");
    }, 1000);
  };

  const handleServerError = (error) => {
    alert(`Error ${error} . Por favor, comuníquese con soporte`);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handlePageNotFound = () => {
    setTimeout(() => {
      navigate("/notFound");
    }, 1000);
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const { status } = error.response;
          switch (status) {
            case 403:
              console.log("error 403");
              handleSessionExpired();
              break;
            case 404:
              console.log("Error de servidor");
              handlePageNotFound();
              break;
            case 500:
              handleServerError(500);
              break;
            case "ERR_FAILED":
              console.log("ERR_FAILED");
              break;
            case "Error CORS":
              console.log("error CORS");
              break;
            case "ha fallado":
              alert("Error del servidor. Por favor, comuníquese con soporte.");
              break;
            default:
              break;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch, navigate]);

  return setupAxiosInterceptors;
};

//export default setupAxiosInterceptors;

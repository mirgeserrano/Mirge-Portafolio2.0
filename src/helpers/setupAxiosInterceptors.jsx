// import axios from "axios";
// import { resetCustomerFailure } from "../redux/features/customerSlice";
// import { resetInvoice } from "../redux/features/invoiceSlice";
// import { resetProduct } from "../redux/features/productSlice";
// import { onLogout } from "../redux/features/authSlice";
// import { useNavigate } from "react-router-dom";

// export const setupAxiosInterceptors = (dispatch) => {
//   const navigate = useNavigate();
//   axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response && error.response.status === 403) {
//         console.log("La sesión ha expirado para la solicitud");
     
//       }  if (error.response && error.response.status === 404) {
//         console.log("Error de servidor");
//       } if (error.response && error.response.status === 500) {
//         // Aquí puedes personalizar el mensaje de alerta como desees
//         alert("Error del servidor. Por favor, comuníquese con soporte.");
//         setTimeout(() => {
//           dispatch(
//             onLogout("Error del servidor. Por favor, comuníquese con soporte")
//           );
//           localStorage.clear();
//           dispatch(resetCustomerFailure());
//           dispatch(resetInvoice());
//           dispatch(resetProduct());
//         }, 10);
//          navigate("/");
//       }
//          setTimeout(() => {
//            dispatch(
//              onLogout(
//                "La Sesión ha expirado para la solicitud debe volver a ingresar"
//              )
//            );
//            localStorage.clear();
//            dispatch(resetCustomerFailure());
//            dispatch(resetInvoice());
//            dispatch(resetProduct());
//          }, 10);
//          navigate("/");
//       return Promise.reject(error);
//     }
//   );
// };
import axios from "axios";
import { resetCustomerFailure } from "../redux/features/customerSlice";
import { resetInvoice } from "../redux/features/invoiceSlice";
import { resetProduct } from "../redux/features/productSlice";
import { onLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const setupAxiosInterceptors = (dispatch) => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 403) {
          console.log("La sesión ha expirado para la solicitud");
          setTimeout(() => {
            dispatch(
              onLogout(
                "La Sesión ha expirado para la solicitud debe volver a ingresar"
              )
            );
            localStorage.clear();
            dispatch(resetCustomerFailure());
            dispatch(resetInvoice());
            dispatch(resetProduct());
            navigate("/");
          }, 10);
        
        } else if (error.response && error.response.status === 404) {
          console.log("Error de servidor");
        } else if (error.response && error.response.status === 500) {
          alert("Error del servidor. Por favor, comuníquese con soporte.");
          setTimeout(() => {
            navigate("/");
          }, 1000);
          
        } else if (error.response && error.response.status === "ERR_FAILED") {
          // Aquí puedes personalizar el mensaje de alerta como desees
          alert("Error del servidor. Por favor, comuníquese con soporte.");
        }
        else if (error.response && error.response.status === "ha fallado") {
          // Aquí puedes personalizar el mensaje de alerta como desees
          alert("Error del servidor. Por favor, comuníquese con soporte.");
        }
          

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch, navigate]);
};


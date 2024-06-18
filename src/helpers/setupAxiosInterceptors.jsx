import axios from "axios";
import { onLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

 const useSetupAxiosInterceptors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    alert(`Error ${error}. Por favor, comuníquese con soporte`);
    // setTimeout(() => {
    //   navigate("/");
    // }, 100);
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
              case 400:
              handleServerError(400);
              break;
            case 500:
              handleServerError(500);
              break;
            default:
              console.log(`Error desconocido: ${status}`);
              break;
          }
        } else if (error.code) {
          // Handle network errors
          switch (error.code) {
            case "ERR_NETWORK":
            case "ERR_CONNECTION_TIMED_OUT":
              console.log("Error de conexión de red (ERR_CONNECTION_TIMED_OUT)" );
              break;
            default:
              console.log(`Error de red desconocido: ${error.code}`);
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
};
 export default useSetupAxiosInterceptors;
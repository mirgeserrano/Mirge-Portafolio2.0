import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 const showConfirmation = () => {
  toast(<ConfirmationNotification />, {
    position: toast.POSITION.TOP_RIGHT,
    closeButton: false,
    closeOnClick: false,
    draggable: false,
    pauseOnHover: true,
  });
};

export const ConfirmationNotification = () => {
  const handleYes = () => {
    // Acciones a realizar si se selecciona "Sí"
    toast.dismiss(); // Cierra la notificación
  };

  const handleNo = () => {
    // Acciones a realizar si se selecciona "No"
    toast.dismiss(); // Cierra la notificación
  };

  return (
    <div>
      ¿Deseas continuar?
      <button onClick={handleYes}>Sí</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
};

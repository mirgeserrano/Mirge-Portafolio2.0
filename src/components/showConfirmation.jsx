import toast from "react-hot-toast";

const ConfirmationNotification = () => {
  toast(<ShowConfirmation />, {
    position: toast.POSITION.TOP_RIGHT,
    closeButton: false,
    closeOnClick: false,
    draggable: false,
    pauseOnHover: true,
  });
};

export const ShowConfirmation = (id) => {
  console.log('aquiii');
  const handleYes = () => {
      ConfirmationNotification(); // Acciones a realizar si se selecciona "Sí"
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

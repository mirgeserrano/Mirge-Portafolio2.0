import { useForm } from "react-hook-form";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import * as yup from "yup";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";

const Contact = () => {
  const schema = yup.object().shape({
    from_name: yup.string().required("El nombre es requerido"),
    to_name: yup.string().email("Email inválido").required("El email es requerido"),
    message: yup.string().required("El mensaje es requerido").min(10, "El mensaje debe tener al menos 10 caracteres"),
  });

  const [isSending, setIsSending] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const toastSweetalert = (mensaje, icon) => {
    const Toast = Swal.mixin({ toast: true, position: "top-end", showConfirmButton: false, timer: 3000, timerProgressBar: true });
    Toast.fire({ icon, title: mensaje });
  };

  const onSubmit = (data) => {
    const templateParams = {
      ...data,
      from_email: data.to_name,
      reply_to: data.to_name,
    };

    setIsSending(true);
    emailjs.send("service_cbg6v1g", "template_u8pegsk", templateParams, "thHjxFqLVfRKmOQNe")
      .then(() => {
        toastSweetalert("¡Su mensaje ha sido enviado! Gracias por contactarse.", "success");
        reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        const message = error?.status === 412
          ? "La conexión de Gmail necesita reconectarse en EmailJS."
          : "Error al enviar el mensaje. Revisa la configuración de EmailJS.";
        toastSweetalert(message, "error");
      })
      .finally(() => setIsSending(false));
  };

  return (
    <section className="contact-page">
      <header className="contact-header">
        <span className="contact-eyebrow">HABLEMOS</span>
        <h1>Construyamos algo valioso.</h1>
        <p>¿Tienes una idea, un reto o un proyecto en mente? Cuéntame qué necesitas y te responderé lo antes posible.</p>
      </header>
        
        <div className="contact-form-panel">
          <div className="contact-form-heading">
               <div className="contact-intro-mark" aria-hidden="true">✦</div>
            <div><h2>Cuéntame sobre tu proyecto</h2><p>Los campos marcados con * son obligatorios.</p></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="contact-field">
              <input className="contact-input" type="text" placeholder="Nombre*" {...register("from_name")} />
              {errors.from_name && <p className="text-red-500">{errors.from_name.message}</p>}
            </div>
            <div className="contact-field">
              <input className="contact-input" type="email" placeholder="Email*" {...register("to_name")} />
              {errors.to_name && <p className="text-red-500">{errors.to_name.message}</p>}
            </div>
            <div className="contact-field">
              <textarea className="contact-input contact-message" placeholder="Mensaje*" {...register("message")} />
              {errors.message && <p className="text-red-500">{errors.message.message}</p>}
            </div>
            <div className="contact-submit-row">
              <button type="submit" className="contact-submit" disabled={isSending}>
                {isSending ? "Enviando..." : "Enviar mensaje"} <span aria-hidden="true">→</span>
              </button>
              <span className="contact-response-note">Respuesta habitual en 24–48 horas.</span>
            </div>
          </form>
        </div>
    </section>
  );
};

export default Contact;

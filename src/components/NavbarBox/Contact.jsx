import { useRef } from "react";
import Line from "../../assets/Line";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      to_name: formRef.current.elements.to_name.value,
      from_name: formRef.current.elements.from_name.value,
      message: formRef.current.elements.message.value,
    };

    // Replace with your actual EmailJS service ID, user ID, and template ID
    emailjs
      .send("service_vyuoipi", "template_x96wgsy", formData, "No9RUEFoUc9dAy8IJ")
      .then((response) => {
        console.log(
          "Correo electrónico enviado con éxito:",
          response.status,
          response.text
        );
        alert("¡Su mensaje ha sido enviado! Gracias por contactarse.");
        formRef.current.reset();
      })
      .catch((error) => {
        console.error(
          "Error al enviar correo electrónico:",
          error.status,
          error.text
        );
        alert(
          "Error al enviar el mensaje. Por favor, intente nuevamente más tarde."
        );
      });
  };

  return (
    <div>
      <h2 className="text-6xl dark:text-white font-bold mb-12 md:mb-[30px] pl-4 md:pl-[60px] pt-12">
        Contactamé
        <Line />
      </h2>
      <div className="mx-4 md:mx-[60px] p-4 md:p-16 dark:border-[#212425] dark:border-2 bg-[#F3F6F6] rounded-xl dark:bg-[#111111]   aos-init aos-animate   ">
        <h2 className="text-2xl">
          <span className="text-gray-lite dark:text-[#A6A6A6]">
            Siempre estoy abierta a discutir sobre
          </span>
          <br />
          <span className="font-semibold dark:text-white">
            trabajos de diseño de producto o asociaciones.
          </span>
        </h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mt-[40px] mb-8 group">
            <input
              className="block autofill:bg-transparent py-2.5 px-0 w-full text-sm text-gray-lite bg-transparent border-0 border-b-[2px] border-[#B5B5B5] appearance-none dark:text-white dark:border-[#333333] dark:focus:border-[#FF6464] focus:outline-none focus:ring-0 focus:border-[#FF6464] peer"
              type="text"
              name="from_name"
              id="from_name"
              placeholder="Nombre*"
              required
            />
          </div>
          <div className="relative z-0 w-full mt-[40px] mb-8 group">
            <input
              className="block autofill:bg-transparent py-2.5 px-0 w-full text-sm text-gray-lite bg-transparent border-0 border-b-[2px] border-[#B5B5B5] appearance-none dark:text-white dark:border-[#333333] dark:focus:border-[#FF6464] focus:outline-none focus:ring-0 focus:border-[#FF6464] peer"
              type="email"
              name="to_name"
              id="to_name"
              placeholder="Email*"
              required
            />
          </div>
          <div className="relative z-0 w-full mt-[40px] mb-8 group">
            <textarea
              className="block autofill:bg-transparent py-2.5 px-0 w-full text-sm text-gray-lite bg-transparent border-0 border-b-[2px] border-[#B5B5B5] appearance-none dark:text-white dark:border-[#333333] dark:focus:border-[#FF6464] focus:outline-none focus:ring-0 focus:border-[#FF6464] peer resize-none"
              name="message"
              id="message"
              placeholder="Mensaje*"
            />
          </div>
          <div>
      
            <input
              type="submit"
              value="Enviar"
              className="inline-flex items-center mx-auto bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l from-[#DD2476]  to-[#fa5252ef] hover:bg-[#DD2476] px-8 py-3 text-lg text-white rounded-[35px] mt-6"
            />
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

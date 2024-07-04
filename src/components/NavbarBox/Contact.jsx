import Line from "../../assets/Line";


const Contact = () => {
  return (
    <div>
      <h2 className="text-6xl dark:text-white font-bold mb-12 md:mb-[30px] pl-4 md:pl-[60px] pt-12">
        Contactamé
      <Line/> 
      </h2>
      <div className="mx-4 md:mx-[60px] p-4 md:p-16 dark:border-[#212425] dark:border-2 bg-[#F3F6F6] rounded-xl dark:bg-[#111111]   aos-init aos-animate   ">
        <h2 className="text-2xl">
          <span className="text-gray-lite dark:text-[#A6A6A6]">
            Siempre estoy abierta a discutir sobre
          </span>
          <br />
          <span className="font-semibold dark:text-white">
            trabajos de diseño de producto o asociaciones.
          </span>
        </h2>
        <form>
          <div className="relative  z-0 w-full mt-[40px] mb-8 group">
            <input className="block autofill:bg-transparent py-2.5 px-0 w-full text-sm text-gray-lite bg-transparent border-0 border-b-[2px] border-[#B5B5B5] appearance-none dark:text-white dark:border-[#333333] dark:focus:border-[#FF6464] focus:outline-none focus:ring-0 focus:border-[#FF6464] peer" />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-color-910 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FF6464] peer-focus:dark:text-[#FF6464] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Nombre*
            </label>
          </div>
          <div className="relative  z-0 w-full mt-[40px] mb-8 group">
            <input className="block autofill:bg-transparent py-2.5 px-0 w-full text-sm text-gray-lite bg-transparent border-0 border-b-[2px] border-[#B5B5B5] appearance-none dark:text-white dark:border-[#333333] dark:focus:border-[#FF6464] focus:outline-none focus:ring-0 focus:border-[#FF6464] peer" />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-color-910 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FF6464] peer-focus:dark:text-[#FF6464] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Email*
            </label>
          </div>
          <div className="relative  z-0 w-full mt-[40px] mb-8 group">
            <input className="block autofill:bg-transparent py-2.5 px-0 w-full text-sm text-gray-lite bg-transparent border-0 border-b-[2px] border-[#B5B5B5] appearance-none dark:text-white dark:border-[#333333] dark:focus:border-[#FF6464] focus:outline-none focus:ring-0 focus:border-[#FF6464] peer" />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-color-910 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FF6464] peer-focus:dark:text-[#FF6464] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Mensaje*
            </label>
          </div>
          <div>
            <input
              type="submit"
              value="Enviar"
              className="inline-flex items-center mx-auto bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l from-[#DD2476]  to-[#fa5252ef] hover:bg-[#DD2476] px-8 py-3 text-lg text-white rounded-[35px] mt-6"
            />
          </div>
        </form>
      </div>
      </div>
  );
};

export default Contact;

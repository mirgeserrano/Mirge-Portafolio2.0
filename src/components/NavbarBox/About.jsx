import Carouse from "./Carouse";
import { Line, Back, Bd, Debug, Front } from "../../assets";

const About = () => {
  return (
    <div>
      <div>
        <di className="flex ">
          <h1 className="text-6xl dark:text-white font-bold mb-12 md:mb-[30px] pl-4 md:pl-[60px] pt-12">
            Sobre Mí
            <Line />
          </h1>
        </di>
        <div className="lpb-12 px-2 sm:px-5 md:px-10 lg:px-14 ">
          <div className="col-span-12 space-y-2.5">
            <div className="lg:mr-16">
              <div className="text-gray-lite  dark:text-white  leading-7">
                Soy una programadora full stack con amplia experiencia en el
                desarrollo de aplicaciones web modernas y escalables. A lo largo
                de mi carrera, he adquirido un sólido dominio de las tecnologías
                front-end y back-end, lo que me permite crear soluciones
                integrales que satisfacen las necesidades de mis clientes.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12 px-2 sm:px-5 md:px-10 lg:px-14">
        <h3 className="text-[35px] dark:text-white font-medium pb-5">
          ¿Que hago?
        </h3>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 ">
          <div className="flex p-6 dark:bg-transparent bg-[#FCF4FF] dark:border dark:border-red-50 rounded-lg">
            <div className="space-y-2 break-all">
              <Front />
              <h3 className="dark:text-white text-xl font-semibold">
                Frontend
              </h3>
              <div className="leading-8 text-gray-lite dark:text-[#A6A6A6]">
                Diseño y desarrollo de interfaces de usuario atractivas e
                intuitivas utilizando HTML5, CSS y JavaScript.
              </div>
            </div>
          </div>

          <div className="p-6 dark:bg-transparent bg-[#FFFDF5] dark:border dark:border-yellow-50 rounded-lg">
            <div className="space-y-2 break-all">
              <Back />
              <h3 className="dark:text-white text-xl font-semibold">Backend</h3>
              <div className="leading-8 text-gray-lite dark:text-[#A6A6A6]">
                Implemento funcionalidades interactivas y dinámicas con
                JavaScript y frameworks como React.
              </div>
            </div>
          </div>

          <div className="p-6 dark:bg-transparent bg-[#E9F8FF] dark:border dark:border-blue-50 rounded-lg">
            <div className="space-y-2 break-all">
              <Bd />
              <h3 className="dark:text-white text-xl font-semibold">
                Base Datos
              </h3>
              <div className="leading-8 text-gray-lite dark:text-[#A6A6A6]">
                Almacena y gestiono datos de manera eficiente utilizando bases
                de datos relacionales (SQL) y no relacionales (MongoDB)
              </div>
            </div>
          </div>

          <div className="p-6 dark:bg-transparent bg-[#FFF0F8] dark:border dark:border-red-50 rounded-lg">
            <div className="space-y-2 break-all">
              <Debug />
              <h3 className="dark:text-white text-xl font-semibold">
                Depuración
              </h3>
              <div className="leading-8 text-gray-lite dark:text-[#A6A6A6]">
                Resuelvo problemas y depuro código tanto front-end como back-end
                para garantizar el correcto funcionamiento de las aplicaciones
              </div>
            </div>
          </div>
        </div>
      </div>

      <Carouse />
    </div>
  );
};

export default About;

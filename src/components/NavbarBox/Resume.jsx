import { Brain, BriefCase, Graduation, Line } from "../../assets";
import { useState } from "react";
const Resume = () => {
  const [activeSection, setActiveSection] = useState(0);

  const [datos, setDatos] = useState([
    {
      cargo: "Front-end Developer",
      fecha: " 2023 / Act. Maracaibo - Venezuela",
      empresa: "EIA Sistemas C.A.",
      description:
        "Actualmente, desarrollo interfaces de usuario para un sistema de facturación utilizando React, Tailwind CSS y Flowbite. Me integro con API's como Saint, The Factory y Banesco para garantizar un proceso fluido y preciso.",
      colorFondo: "#E9F8FF",
    },
    {
      cargo: "Developer Full Stack",
      fecha: "2023 Remoto",
      empresa: "NoCountry",
      description:
        " Mi experiencia abarca tanto el front-end como el back-end. En la red social POV, lideré la construcción de la interfaz de usuario con React y Tailwind CSS, e integré el proyecto utilizando GitHub. En MiFinaz, una app de finanzas personales, desarrollé el back-end, creando la lógica y la estructura de la base de datos.",
      colorFondo: "#FFF0F8",
    },
    {
      cargo: "Analista Funcional de Sistemas",
      fecha: "2019 / 2020 Maracaibo - Venezuela",
      empresa: "Star Gas C.A.",
      description:
        "-Liderar la planificación, ejecución y entrega sobre un proyecto de almacenes llamado K2O. -Gestionar un equipo de 2 profesionales de tecnología.                      asegurando la cohesión y la calidad del trabajo entregado. -Atención al usuario y reporte de fallas.",
      colorFondo: "#FCF4FF",
    },
    {
      cargo: "Analista de Sistemas",
      fecha: "2018 / 2019 Maracaibo - Venezuela",
      empresa: "  Metro de Maracaibo C.A.",
      description:
        "*Desarrollo de proyectos en PHP-MySQL. *Diseño front-end en HTML5, JQuery, Bootstrap y CSS3. *Planificación de las tareas y cumplimiento de los objetivos. *Codificación eficaz de cambios y alteraciones de software en base a especificaciones de diseño concretas. *Manejo de base de datos.",
      colorFondo: "#FFFDF5",
    },
  ]);
  const handleSectionClick = (index) => {
    setActiveSection(index === activeSection ? -1 : index);
  };
  return (
    <div>
      <h1 className="text-6xl dark:text-white font-bold mb-12 md:mb-[30px] pl-4 md:pl-[60px] pt-12">
        Resumen <Line />
      </h1>
      <div className="pb-12 px-2 sm:px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-6 mt-[30px] ">
          <div className="">
            <div className="flex p-4">
              <Graduation />
              <h4 className="text-4xl dark:text-white font-medium">Estudios</h4>
            </div>

            <div className="flex flex-wrap p-6 dark:bg-transparent bg-[#FCF4FF] dark:border dark:border-red-50 rounded-lg mb-4">
              <div className="space-y-2">
                <h5 className=" text-gray-500 dark:text-white text-lg  ">
                  2023
                </h5>
                <h3 className="dark:text-white text-xl font-semibold">
                  CertiProf
                </h3>
                <div className="leading-8 text-gray-lite dark:text-[#A6A6A6]">
                  Certificaciones Agile Scrum
                </div>
              </div>
            </div>

            <div className="flex flex-wrap p-6 dark:bg-transparent bg-[#FFF0F0] dark:border dark:border-red-50 rounded-lg mb-4">
              <div className="space-y-2 ">
                <h5 className=" text-gray-500 dark:text-white text-lg ">
                  2018
                </h5>
                <h3 className="dark:text-white text-xl font-semibold">
                  Urbe (Universidad Rafel Bello Chacin )
                </h3>
                <div className="leading-8 text-gray-lite dark:text-[#A6A6A6]">
                  Webmaster
                </div>
              </div>
            </div>

            <div className="flex flex-wrap p-6 dark:bg-transparent bg-[#E9F8FF] dark:border dark:border-red-50 rounded-lg mb-4">
              <div className="space-y-2">
                <h5 className="dark:text-white text-lg ">2018</h5>
                <h3 className="dark:text-white text-xl font-semibold">
                  Ingeniería de Sistemas
                </h3>
                <div className="leading-8 text-gray-lite dark:text-[#A6A6A6] flex-wrap: wrap">
                  Universidad Nacional Experimental De Las Fuerzas Armadas
                  Maracaibo, Venezuela
                </div>
              </div>
            </div>

            <div className="flex flex-wrap space-y-2 p-6 dark:bg-transparent bg-[#FFFDF5] dark:border dark:border-red-50 rounded-lg mb-4">
              <div className="space-y-2">
                <h5 className=" text-gray-500 dark:text-white text-lg ">
                  2016
                </h5>
                <h3 className="dark:text-white text-xl font-semibold">Logro</h3>
                <div className="leading-8 text-gray-lite dark:text-[#A6A6A6]">
                  Mantenimiento y reparación de computadoras.
                </div>
              </div>
            </div>

            <div className="flex flex-wrap p-6 dark:bg-transparent bg-[#FFF0F0] dark:border dark:border-red-50 rounded-lg mb-4">
              <div className="space-y-2">
                <h5 className="text-gray-500 dark:text-white text-lg ">2013</h5>
                <h3 className="dark:text-white text-xl font-semibold">
                  Bachiller en Ciencias
                </h3>
                <div className="leading-8 text-gray-lite dark:text-[#A6A6A6]">
                  U. E. P. José Laurencio Silva Maracaibo, Venezuela
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex p-4 ">
              <BriefCase />
              <h4 className=" text-4xl dark:text-white font-medium">
                Experiencia
              </h4>
            </div>
            {datos.map((section, index) => (
              <div
                key={index}
                className={`p-6 dark:bg-transparent  bg-[${
                  section.colorFondo
                }] dark:border  dark:text-white rounded-lg mb-4 ${
                  activeSection === index ? "active" : ""
                }`}
              >
                <button
                  className="text-xl font-bold"
                  onClick={() => handleSectionClick(index)}
                >
                  {section.empresa}
                </button>
                <div
                  className={`p-2 dark:bg-transparent rounded-lg`}
                >
                  {activeSection === index && (
                    <div className=" flex flex-wrap space-y-2">
                      <h5 className=" text-gray-500 dark:text-white text-lg ">
                        {section.fecha}
                      </h5>
                      <h3 className="text-gray-600 dark:text-white text-md font-semibold">
                        <span className="font-bold ">Frotend Developer</span>
                      </h3>
                      <div className="leading-8 text-gray-lite dark:text-[#A6A6A6]">
                        {section.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex p-4">
          <Brain />
          <h4 className="text-4xl dark:text-white font-medium">Habilidades</h4>
        </div>
        <div className="p-7 rounded-2xl mt-7  bg-[#F3F6F6] dark:bg-[#1D1D1D]">
          <div className=" flex flex-wrap justify-between p-4 ">
            <h2 className="mb-4 shadow-lg inline-block dark:bg-[#1D1D1D] px-5 py-1.5 bg rounded-lg bg-[#FFFDF5] dark:text-[#A6A6A6] dark:border dark:border-red-50  ">
              Pensamiento Analítico
            </h2>
            <h2 className="mb-4 shadow-lg inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg bg-[#FFF0F0]   dark:text-[#A6A6A6] dark:border dark:border-red-50 ">
              Gestión de Proyecto
            </h2>
            <h2 className="mb-4 shadow-lg  inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg bg-[#E9F8FF]  dark:text-[#A6A6A6] dark:border dark:border-red-50 ">
              Constancia
            </h2>
            <h2 className="mb-4 shadow-lg inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg bg-[#FFFDF5] dark:text-[#A6A6A6] dark:border dark:border-red-50 ">
              Liderazgo de equipos
            </h2>
            <h2 className="mb-4 shadow-lg inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg bg-[#FCF4FF]  dark:text-[#A6A6A6]  dark:border dark:border-red-50">
              Proactivo
            </h2>
            <h2 className="mb-4 shadow-lg inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg bg-[#FFFDF5] dark:text-[#A6A6A6] dark:border dark:border-red-50 ">
              Habilidades de Comunicación
            </h2>
            <h2 className="mb-4 shadow-lg inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg bg-[#FFFDF5] dark:text-[#A6A6A6] dark:border dark:border-red-50 ">
              Trabajo en equipo
            </h2>
            <h2 className="mb-4 shadow-lg inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg bg-[#E9F8FF]  dark:text-[#A6A6A6]  dark:border dark:border-red-50 ">
              UX/UI
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;

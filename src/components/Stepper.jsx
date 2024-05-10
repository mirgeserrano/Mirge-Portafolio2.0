import React, { useState } from "react";

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(1); // Estado para almacenar el paso activo

  const handleStepClick = (step) => {
    // Función para cambiar el paso activo cuando se hace clic en un paso
    setActiveStep(step);
  };

  console.log(activeStep);

  return (
    <div className="flex items-center justify-center w-full mx-auto sm:mb-5 ">
      <li
        className={`flex w-1/3 items-center ${
          activeStep === 1
            ? "after:border-[#BFE1D5] "
            : "after:border-gray-200 "
        } dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block dark:after:border-blue-800`}
        onClick={() => handleStepClick(1)}
      >
        <div
          className={`flex items-center justify-center w-10 h-10 ${
            activeStep === 1 ? "bg-[#BFE1D5] " : "bg-gray-200 "
          } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
        >
          <svg
            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            //       className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="1.5"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
          </svg>
        </div>
      </li>
      <li
        className={`flex w-1/3  items-center ${
          activeStep === 2
            ? "after:border-[#BFE1D5] "
            : "after:border-gray-200 "
        } dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block dark:after:border-blue-800`}
        onClick={() => handleStepClick(2)}
      >
        <div
          className={`flex items-center justify-center w-10 h-10 ${
            activeStep === 2 ? "bg-[#BFE1D5] " : "bg-gray-200"
          } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
        >
          <svg
            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            //    className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 14"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
            <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
          </svg>
        </div>
      </li>
      <li
        className={`flex  items-center ${
          activeStep === 3 ? "after:border-blue-200 " : "after:border-gray-200"
        } dark:text-blue-500  dark:after:border-blue-800`}
        onClick={() => handleStepClick(3)}
      >
        <div
          className={`flex items-center justify-center w-5 h-5 ${
            activeStep === 3 ? "bg-[#BFE1D5] " : "bg-gray-200 "
          } rounded-full lg:h-12 lg:w-12 dark:bg-[#BFE1D5] shrink-0`}
        >
          <svg
            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            //            className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
          </svg>
        </div>
      </li>
    </div>
  );
};

export default Stepper;

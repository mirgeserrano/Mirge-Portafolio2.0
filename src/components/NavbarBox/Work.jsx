import { Line } from "../../assets";
import ContanerCar from "../ContanerCar";
import Tarjeta from "../Tarjeta";

const Work = () => {
  return (
    <>
      <h2 className="text-6xl dark:text-white font-bold mb-12 md:mb-[30px] pl-4 md:pl-[60px] pt-12">
        Portafolio
        <Line />
      </h2>

      <ContanerCar />
    </>
  );
};

export default Work;

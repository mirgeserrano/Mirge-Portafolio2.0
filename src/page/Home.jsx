import { useEffect, useState } from "react";
import { ApiTheFatory } from "../api/ApiThefatory";
import { Navbar, SideBar } from "../components";
import home from "../assets/images/home.png";


const Home = () => {
  const [data, setdata] = useState();
  const { Autenticacion } = ApiTheFatory();

  useEffect(() => {
    Autenticacion()
      .then((data) => {
        setdata(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="lg:grid lg:grid-cols-4 md:grid-cols-4  xs:grid-cols-4  h-screen  pt-16">
        <div className="col-span-1 p-2 ">
          <SideBar />
        </div>
        <div className=" flex  justify-center items-center sm:flex-row lg:col-span-3 p-6">
        <div className="flex flex-col  w-96 h-96 p-4">
        <h1 className="text-4xl font-bold">Bienvenido!!</h1>
        <p className="text-justify"> Descubre FactuPro, tu nueva herramienta imprescindible para la gestión de facturas! Con FactuPro, no solo simplificas el proceso de facturación, sino que también optimizas tu tiempo y recursos. Nuestro software intuitivo y fácil de usar te permite generar, enviar y gestionar facturas de manera eficiente, asegurando una administración financiera impecable para tu negocio</p>  
        </div>
        <img className=" w-full sm:w-1/2 h-auto" src={home} alt="user photo" />    
      
        </div>
      </div>
    </>
        
    
  );
};
export default Home;

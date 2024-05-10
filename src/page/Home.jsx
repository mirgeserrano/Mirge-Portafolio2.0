import { useEffect, useState } from "react"
import { ApiTheFatory } from "../api/ApiThefatory"
import {Navbar, SideBar } from "../components"

const Home = () => {
const [data, setdata] = useState()
  const {Autenticacion} = ApiTheFatory()

   useEffect(() => {
     Autenticacion()
       .then((data) => {
         setdata(data);
       })
       .catch((error) => {
         console.log(error);
       });
   }, []);

console.log(data);


  return (
    <>
    <Navbar/>
    <SideBar/>
    </>
  )
}
 export default Home
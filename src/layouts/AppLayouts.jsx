// import { InfBox, Navbar } from "../components"
// import { NavbarBox } from "../components/NavbarBox"
// import fondoDark  from "../assets/images/fondoDark.png";

// const AppLayouts = () => {
//   return (
//     <div
//     className="min-h-screen bg-no-repeat bg-center bg-cover bg-fixed md:pb-16 w-full "
//     data-aos="fade"
//     style={{
//           backgroundImage: url(${darkMode} ? fondoDark : fondo)
//         }}
//   >
//     <Navbar />
//     <div className="container mx-auto grid grid-cols-12 md:gap-10  justify-between lg:mt-[220px]  ">
    
//       <InfBox />
//       <NavbarBox />
//     </div>
//   </div>
//   )
// }




import { InfBox, Navbar } from "../components"
import { NavbarBox } from "../components/NavbarBox"
import fondoDark from "/src/assets/images/fondoDark.png";

const AppLayouts = () => {
  const backgroundImage = darkMode ? `url(${fondoDark})` : 'url(your-light-mode-image)';

  return (
    <div
      className="min-h-screen bg-no-repeat bg-center bg-cover bg-fixed md:pb-16 w-full "
      data-aos="fade"
      style={{ backgroundImage }}
    >
      <div className="container mx-auto grid grid-cols-12 md:gap-10  justify-between lg:mt-[220px]  ">
    
    <InfBox />
    <NavbarBox />
  </div>
    </div>
  );
};
export default AppLayouts
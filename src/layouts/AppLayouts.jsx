import { InfBox, Navbar } from "../components"
import { NavbarBox } from "../components/NavbarBox"

const AppLayouts = () => {
  return (
    <div
    className="bg-fondo dark:bg-fondoDark min-h-screen bg-no-repeat bg-center bg-cover bg-fixed md:pb-16 w-full "
    data-aos="fade"
  >
    <Navbar />
    <div className="container mx-auto grid grid-cols-12 md:gap-10  justify-between lg:mt-[220px]  ">
      <InfBox />
      <NavbarBox />
    </div>
  </div>
  )
}

export default AppLayouts
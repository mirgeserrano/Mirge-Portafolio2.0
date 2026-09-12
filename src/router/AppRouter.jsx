
import About from "../pages/About";
import Contact from "../pages/Contact";
import Resume from "../pages/Resume";
import Work from "../pages/Work";
import ProjectDetail from "../components/projects/ProjectDetail";
import "../index.css";
import AppLayouts from "../layouts/AppLayouts";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayouts />}>
          <Route index element={<About />} />
          <Route path="about" element={<About />} />
          <Route path="resume" element={<Resume />} />
          <Route path="work" element={<Work />} />
          <Route path="contact" element={<Contact />} />
          <Route path="detalle/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
      
    </>
  );
};

export default AppRouter;

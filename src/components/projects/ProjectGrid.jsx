import ProjectCard from "./ProjectCard";
import lgofactupro from "../../assets/images/LogoFactuPro.png";
import logofinaza from "../../assets/images/LogoFinanza.png";
import logopov from "../../assets/images/LogoPov.png";
import placeholder from "../../assets/images/2.png";
import projects from "../../data/projects.json";
import cepin from "../../assets/images/cepin.jpg";
import nails from "../../assets/images/nail.jpg";
import ftmPage from "../../assets/images/Ftmpage.png";
import ftmdigitalizacion from "../../assets/images/ftmdigitalizacion.jpg";

const projectImages = {
  factupro: lgofactupro,
  pov: logopov,
  finanza: logofinaza,
  placeholder,
  cepin1: cepin,
  nails,
  ftmpage: ftmPage,
  ftmdigitalizacion: ftmdigitalizacion,
};

const ProjectGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={{ ...project, image: projectImages[project.image] }}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;

import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/projects/ProjectCard";
import projects from "../data/projects.json";
import factupro from "../assets/images/factupro.png";
import pov from "../assets/images/pov.png";
import finanza from "../assets/images/finanza.png";
import placeholder from "../assets/images/2.png";
import cepin from "../assets/images/cepin.jpg";
import nails from "../assets/images/nail.jpg";
import ftmPage from "../assets/images/Ftmpage.png";
import ftmdigitalizacion from "../assets/images/ftmdigitalizacion.jpg";


const projectImages = {
  factupro,
  pov,
  finanza,
  placeholder,
  cepin1: cepin,
  nails,
  ftmpage: ftmPage,
ftmdigitalizacion:ftmdigitalizacion
  
};
const filters = ["Todos", "Destacados", "Web / Frontend", "Apps Móviles / AppSheet", "Backend / APIs", "Otros"];

const getCategory = (project) => {
    if (project.title === "Automatizacion de Reporte" || project.title === "Bienes raíces") return "Destacados";

  if (project.title === "Eliananails Studio" || project.title === "Ftm Sourcing" || project.title === "Fundación Cepin") return "Web / Frontend";
  if (project.title === "POV" || project.title === "Calendario") return "Apps Móviles / AppSheet";
  if (project.title === "MiFinanzas") return "Backend / APIs";
  return "Otros";
};

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const visibleProjects = projects.filter((project) => activeFilter === "Todos" || getCategory(project) === activeFilter);

  return (
    <section className="work-page">
      <header className="work-hero">
        <div>
          <h1>Proyectos</h1>
          <p className="work-intro">
            Aquí encontrarás algunos de los proyectos en los que he trabajado.<br />
            Cada uno representa un reto, una solución y una parte de mi crecimiento profesional.
          </p>
        </div>
      
      </header>

      <nav className="work-filters" aria-label="Filtrar proyectos">
        {filters.map((filter) => (
          <button key={filter} type="button" className={activeFilter === filter ? "is-active" : ""} onClick={() => setActiveFilter(filter)}>
            <span aria-hidden="true">{filter === "Todos" ? "▦" : filter === "Otros" ? "•••" : "▣"}</span>{filter}
          </button>
        ))}
      </nav>

      <div className="work-grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={{ ...project, image: projectImages[project.image] }} />
        ))}
      </div>

      <aside className="work-cta">
        <span className="work-cta-icon" aria-hidden="true">↗</span>
        <div><strong>¿Te gustaría ver más proyectos?</strong><p>Estoy en constante aprendizaje y siempre trabajando en nuevas ideas.</p></div>
        <Link to="/contact">Contactame <span aria-hidden="true">→</span></Link>
      </aside>
    </section>
  );
};

export default Work;

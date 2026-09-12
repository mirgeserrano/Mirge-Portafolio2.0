import { useNavigate, useParams } from "react-router-dom";
import projects from "../../data/projects.json";
import pov from "../../assets/images/pov.png";
import finanza from "../../assets/images/finanza.png";
import factupro from "../../assets/images/factupro.png";
import placeholder from "../../assets/images/2.png";
import cepin from "../../assets/images/cepin.jpg";
import nails from "../../assets/images/nail.jpg";
import ftmPage from "../../assets/images/Ftmpage.png";
import ftmdigitalizacion from "../../assets/images/ftmdigitalizacion.jpg";

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

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const project = projects.find((item) => item.id === id);

  if (!project) {
    return <div>Datos no encontrados</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => navigate(-1)}
      ></div>
      <div
        className="project-detail-modal bg-white dark:bg-[#323232] mx-auto rounded-xl absolute left-1/2 top-1/2 transform -translate-x-[50%] -translate-y-[50%] shadow-lg"
        style={{ backgroundColor: project.backgroundColor }}
      >
        <div className="project-detail-content">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <div className="project-detail-header">
            <span className="project-detail-kicker">CASO DE ESTUDIO</span>
            <h2>
            {project.title}
            </h2>
            <p className="project-detail-client">{project.company} · {project.client}</p>
          </div>
          <img src={projectImages[project.image]} alt={`Vista previa de ${project.title}`} className="project-detail-image" />
          <div className="project-detail-meta">
            <div><span>Rol</span><strong>Desarrollo web</strong></div>
            <div><span>Tecnologías</span><strong>{project.language}</strong></div>
          </div>
          <p className="project-detail-description">{project.description}</p>
          <div className="project-case-study">
            <article><span>01</span><h3>Problema</h3><p>{project.caseStudy?.problem}</p></article>
            <article><span>02</span><h3>Solución</h3><p>{project.caseStudy?.solution}</p></article>
            <article><span>03</span><h3>Qué hice</h3><p>{project.caseStudy?.work}</p></article>
            <article><span>04</span><h3>Resultado</h3><p>{project.caseStudy?.result}</p></article>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-5 text-[#ef4060] font-semibold"
            >
              Ver proyecto
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

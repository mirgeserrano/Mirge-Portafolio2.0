import { useNavigate, useParams } from "react-router-dom";
import projects from "../../data/projects.json";
import projectImages from "../../data/projectImages";
import LazyImage from "../common/LazyImage";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <div className="flex min-h-[20rem] items-center justify-center p-6 text-center text-slate-600" role="status" aria-live="polite">
        No se encontró este proyecto. Regresa a la lista para seguir explorando.
      </div>
    );
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
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4060]"
            aria-label="Cerrar detalle del proyecto"
            type="button"
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
          <LazyImage
            src={projectImages[project.image]}
            alt={`Imagen principal del proyecto ${project.title}`}
            className="project-detail-image"
            placeholderClassName="lazy-image-placeholder project-detail-image-placeholder"
          />
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

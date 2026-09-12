import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const tags = project.language.split(",").slice(0, 3);

  return (
    <article className="work-card">
      <Link to={`/detalle/${project.id}`} className="work-card-image" style={{ backgroundColor: project.backgroundColor }}>
        <img src={project.image} alt={`Vista previa de ${project.title}`} />
      </Link>
      <div className="work-card-content">
        <span className="work-card-category">Caso de estudio · {project.company}</span>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className="work-tags">
          {tags.map((tag) => <span key={tag}>{tag.trim()}</span>)}
        </div>
        <Link to={`/detalle/${project.id}`} className="work-card-link">
          Ver caso de estudio <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;

import { Link } from "react-router-dom";
import LazyImage from "../common/LazyImage";
import { getProjectTags } from "../../data/projectCatalog";

const ProjectCard = ({ project }) => {
  const tags = getProjectTags(project, 3);

  return (
    <article className="work-card">
      <Link
        to={`/detalle/${project.id}`}
        className="work-card-image"
        style={{ backgroundColor: project.backgroundColor }}
        aria-label={`Abrir detalle de ${project.title}`}
      >
        <LazyImage
          src={project.image}
          alt={`Vista previa del proyecto ${project.title}`}
          className="work-card-image-element"
          placeholderClassName="lazy-image-placeholder work-card-image-placeholder"
        />
      </Link>
      <div className="work-card-content">
        <span className="work-card-category">Caso de estudio · {project.company}</span>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className="work-tags">
          {tags.map((tag) => (
            <span key={`${project.id}-${tag}`}>{tag}</span>
          ))}
        </div>
        <Link to={`/detalle/${project.id}`} className="work-card-link">
          Ver caso de estudio <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;

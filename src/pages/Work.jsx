import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/projects/ProjectCard";
import projects from "../data/projects.json";
import projectImages from "../data/projectImages";
import { getVisibleProjects } from "../data/projectCatalog";
import { workCta, workFilters } from "../content/siteContent";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleProjects = useMemo(
    () => getVisibleProjects(projects, activeFilter),
    [activeFilter]
  );

  return (
    <section className="work-page" aria-live="polite">
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
        {workFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={activeFilter === filter.id ? "is-active" : ""}
            onClick={() => setActiveFilter(filter.id)}
            aria-label={`Filtrar por ${filter.label}`}
            aria-pressed={activeFilter === filter.id}
          >
            <span aria-hidden="true">{filter.id === "all" ? "▦" : filter.id === "other" ? "•••" : "▣"}</span>
            {filter.label}
          </button>
        ))}
      </nav>

      {visibleProjects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600" role="status" aria-live="polite">
          No hay proyectos para este filtro en este momento.
        </div>
      ) : (
        <div className="work-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={{ ...project, image: projectImages[project.image] }} />
          ))}
        </div>
      )}

      <aside className="work-cta">
        <span className="work-cta-icon" aria-hidden="true">↗</span>
        <div>
          <strong>{workCta.title}</strong>
          <p>{workCta.description}</p>
        </div>
        <Link to={workCta.linkTo}>{workCta.buttonLabel} <span aria-hidden="true">→</span></Link>
      </aside>
    </section>
  );
};

export default Work;

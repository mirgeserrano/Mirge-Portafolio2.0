import { useState } from "react";

const technologyGroups = [
  { id: "frontend", label: "Frontend", marker: "▣", technologies: [["HTML5", "html5", "#f16529"], ["CSS3", "css3", "#1572b6"], ["JavaScript", "javascript", "#f7df1e"], ["React", "react", "#00d8ff"], ["Tailwind CSS", "tailwindcss", "#38bdf8"], ["Bootstrap", "bootstrap", "#7952b3"], ["Git", "git", "#f05032"]] },
  { id: "backend", label: "Backend", marker: "◇", technologies: [["Node.js", "nodejs", "#539e43"], ["Express", "express", "#222222"], ["Python", "python", "#3776ab"], ["PHP", "php", "#777bb4"], ["Java", "java", "#e76f00"]] },
  { id: "database", label: "Bases de Datos", marker: "▤", technologies: [["MySQL", "mysql", "#4479a1"], ["MongoDB", "mongodb", "#47a248"], ["PostgreSQL", "postgresql", "#4169e1"], ["SQLite", "sqlite", "#003b57"]] },
  { id: "tools", label: "Herramientas", marker: "⌘", technologies: [["GitHub", "github", "#181717"], ["VS Code", "vscode", "#007acc"], ["Figma", "figma", "#f24e1e"], ["Postman", "postman", "#ff6c37"]] },
];

const iconUrl = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

const TechStack = () => {
  const [activeGroup, setActiveGroup] = useState("frontend");
  const selectedGroup = technologyGroups.find(({ id }) => id === activeGroup);

  return (
    <section className="tech-stack-panel" aria-labelledby="tech-stack-title">
       <h2 className="about-section-title">
          <span aria-hidden="true" />
          Stack Tecnológico
          <span aria-hidden="true" />
        </h2>
      <p className="tech-stack-subtitle">Herramientas y tecnologías que utilizo para crear soluciones modernas y eficientes.</p>
      <div className="tech-stack-tabs" role="tablist" aria-label="Categorías tecnológicas">
        {technologyGroups.map((group) => (
          <button key={group.id} type="button" role="tab" aria-selected={activeGroup === group.id} className={activeGroup === group.id ? "is-active" : ""} onClick={() => setActiveGroup(group.id)}>
            <span aria-hidden="true">{group.marker}</span>{group.label}
          </button>
        ))}
      </div>
      <div className="tech-stack-items" role="tabpanel">
        {selectedGroup.technologies.map(([label, icon, color]) => (
          <article className="tech-stack-item" key={label}>
            <div className="tech-stack-logo" style={{ color }}><img src={iconUrl(icon)} alt="" loading="lazy" /></div>
            <span>{label}</span>
          </article>
        ))}
      </div>
      <div className="tech-stack-dots" aria-hidden="true">
        {technologyGroups.map((group) => <span key={group.id} className={activeGroup === group.id ? "is-active" : ""} />)}
      </div>
    </section>
  );
};

export default TechStack;

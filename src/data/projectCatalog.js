export const PROJECT_FILTERS = [
  { id: "all", label: "Todos" },
  { id: "featured", label: "Destacados" },
  { id: "frontend", label: "Web / Frontend" },
  { id: "mobile", label: "Apps Móviles / AppSheet" },
  { id: "backend", label: "Backend / APIs" },
  { id: "other", label: "Otros" },
];

export const CATEGORY_LABELS = {
  all: "Todos",
  featured: "Destacados",
  frontend: "Web / Frontend",
  mobile: "Apps Móviles / AppSheet",
  backend: "Backend / APIs",
  other: "Otros",
};

export const getProjectCategory = (project) => {
  const categoryKey = project?.category ?? "other";
  return CATEGORY_LABELS[categoryKey] ?? CATEGORY_LABELS.other;
};

export const getProjectTags = (project, limit = 3) => {
  if (!project?.language) return [];

  return project.language
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, limit);
};

export const getVisibleProjects = (projectList, activeFilter) => {
  if (!projectList) return [];
  if (activeFilter === "all") return projectList;

  return projectList.filter((project) => project.category === activeFilter);
};

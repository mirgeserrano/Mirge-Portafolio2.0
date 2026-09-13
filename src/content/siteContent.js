export const navigationItems = [
  { path: "/about", label: "Sobre Mi", icon: "about" },
  { path: "/resume", label: "Resumen", icon: "resume" },
  { path: "/work", label: "Trabajos", icon: "work" },
  { path: "/contact", label: "Contactame", icon: "contact" },
];

export const aboutContent = {
  title: "Desarrollo soluciones",
  highlight: "impacto.",
  intro:
    "Soy una programadora full stack apasionada por crear aplicaciones web modernas, eficientes y escalables. Combino diseño, lógica y tecnología para construir soluciones que resuelven problemas reales y aportan valor a las personas y negocios.",
  strengthsLabel: "¿Qué hago?",
};

export const workFilters = [
  { id: "all", label: "Todos" },
  { id: "featured", label: "Destacados" },
  { id: "frontend", label: "Web / Frontend" },
  { id: "mobile", label: "Apps Móviles / AppSheet" },
  { id: "backend", label: "Backend / APIs" },
  { id: "other", label: "Otros" },
];

export const workCta = {
  title: "¿Te gustaría ver más proyectos?",
  description: "Estoy en constante aprendizaje y siempre trabajando en nuevas ideas.",
  buttonLabel: "Contactame",
  linkTo: "/contact",
};

export const contactContent = {
  eyebrow: "HABLEMOS",
  title: "Construyamos algo valioso.",
  intro: "¿Tienes una idea, un reto o un proyecto en mente? Cuéntame qué necesitas y te responderé lo antes posible.",
  panelTitle: "Cuéntame sobre tu proyecto",
  panelHint: "Los campos marcados con * son obligatorios.",
  namePlaceholder: "Nombre*",
  emailPlaceholder: "Email*",
  messagePlaceholder: "Mensaje*",
  submit: "Enviar mensaje",
  submitting: "Enviando...",
  responseNote: "Respuesta habitual en 24–48 horas.",
};

export const resumeContent = {
  title: "Resumen",
  studiesTitle: "Estudios",
  experienceTitle: "Experiencia",
  skillsTitle: "Habilidades",
  studies: [
    {
      year: "2023",
      title: "CertiProf",
      detail: "Certificaciones Agile Scrum",
      tone: "#FCF4FF",
    },
    {
      year: "2018",
      title: "Urbe (Universidad Rafael Belloso Chacín)",
      detail: "Webmaster",
      tone: "#FFF0F0",
    },
    {
      year: "2018",
      title: "Ingeniería de Sistemas",
      detail: "Universidad Nacional Experimental de las Fuerzas Armadas Maracaibo, Venezuela",
      tone: "#E9F8FF",
    },
    {
      year: "2016",
      title: "Logro",
      detail: "Mantenimiento y reparación de computadoras.",
      tone: "#FFFDF5",
    },
    {
      year: "2013",
      title: "Bachiller en Ciencias",
      detail: "U. E. P. José Laurencio Silva Maracaibo, Venezuela",
      tone: "#FFF0F0",
    },
  ],
  experience: [
    {
      company: "EIA Sistemas C.A.",
      role: "Front-end Developer",
      period: "2023 / Act. Maracaibo - Venezuela",
      description:
        "Actualmente, desarrollo interfaces de usuario para un sistema de facturación utilizando React, Tailwind CSS y Flowbite. Me integro con API's como Saint, The Factory y Banesco para garantizar un proceso fluido y preciso.",
      tone: "#E9F8FF",
    },
    {
      company: "NoCountry",
      role: "Developer Full Stack",
      period: "2023 Remoto",
      description:
        "Mi experiencia abarca tanto el front-end como el back-end. En la red social POV, lideré la construcción de la interfaz de usuario con React y Tailwind CSS, e integré el proyecto utilizando GitHub. En MiFinaz, una app de finanzas personales, desarrollé el back-end, creando la lógica y la estructura de la base de datos.",
      tone: "#FFF0F8",
    },
    {
      company: "Star Gas C.A.",
      role: "Analista Funcional de Sistemas",
      period: "2019 / 2020 Maracaibo - Venezuela",
      description:
        "Liderar la planificación, ejecución y entrega sobre un proyecto de almacenes llamado K2O. Gestionar un equipo de 2 profesionales de tecnología, asegurando la cohesión y la calidad del trabajo entregado. Atención al usuario y reporte de fallas.",
      tone: "#FCF4FF",
    },
    {
      company: "Metro de Maracaibo C.A.",
      role: "Analista de Sistemas",
      period: "2018 / 2019 Maracaibo - Venezuela",
      description:
        "Desarrollo de proyectos en PHP-MySQL. Diseño front-end en HTML5, JQuery, Bootstrap y CSS3. Planificación de las tareas y cumplimiento de los objetivos. Codificación eficaz de cambios y alteraciones de software en base a especificaciones de diseño concretas. Manejo de base de datos.",
      tone: "#FFFDF5",
    },
  ],
  skills: [
    "Pensamiento Analítico",
    "Gestión de Proyecto",
    "Constancia",
    "Liderazgo de equipos",
    "Proactivo",
    "Habilidades de Comunicación",
    "Trabajo en equipo",
    "UX/UI",
  ],
};

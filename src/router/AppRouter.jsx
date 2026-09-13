
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import RouteLoadingSkeleton from "../components/common/RouteLoadingSkeleton";
import AppLayouts from "../layouts/AppLayouts";
import "../styles/index.css";

const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Resume = lazy(() => import("../pages/Resume"));
const Work = lazy(() => import("../pages/Work"));
const ProjectDetail = lazy(() => import("../components/projects/ProjectDetail"));

const routeMeta = {
  "/": {
    title: "Mirgelys Serrano | Portfolio",
    description:
      "Portfolio profesional de Mirgelys Serrano: proyectos, experiencia, stack tecnológico y contacto para clientes y empresas.",
  },
  "/about": {
    title: "Sobre mí | Mirgelys Serrano",
    description:
      "Conoce más sobre Mirgelys Serrano, su enfoque, experiencia y soluciones de desarrollo web y software.",
  },
  "/resume": {
    title: "Resumen profesional | Mirgelys Serrano",
    description:
      "Estudios, experiencia laboral, proyectos y habilidades de Mirgelys Serrano como desarrolladora full stack.",
  },
  "/work": {
    title: "Proyectos | Mirgelys Serrano",
    description:
      "Explora proyectos de diseño y desarrollo web, aplicaciones y soluciones digitales creadas por Mirgelys Serrano.",
  },
  "/contact": {
    title: "Contacto | Mirgelys Serrano",
    description:
      "Ponte en contacto con Mirgelys Serrano para hablar sobre tu proyecto, idea o requerimiento digital.",
  },
  "/detalle/:id": {
    title: "Proyecto | Mirgelys Serrano",
    description:
      "Caso de estudio de proyecto digital, solución desarrollada y resultados obtenidos por Mirgelys Serrano.",
  },
};

const setMetaTag = (selector, attributes, content) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const setCanonicalLink = (pathname) => {
  const fullUrl = `https://mirgelysserrano.com${pathname}`;
  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", fullUrl);
};

const StructuredData = () => {
  const location = useLocation();

  useEffect(() => {
    const basePath = location.pathname || "/";
    const pageMeta =
      routeMeta[basePath] ||
      (basePath.startsWith("/detalle/") ? routeMeta["/detalle/:id"] : routeMeta["/"]);

    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Mirgelys Serrano",
      jobTitle: "Product Designer & Frontend Developer",
      url: "https://mirgelysserrano.com",
      sameAs: [
        "https://www.linkedin.com/in/mirgelys-serrano-b232a4106/",
        "https://github.com/mirgeserrano",
      ],
      knowsAbout: [
        "React",
        "JavaScript",
        "Frontend Development",
        "UI/UX",
        "Design Systems",
      ],
      description: pageMeta.description,
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Mirgelys Serrano Portfolio",
      url: "https://mirgelysserrano.com",
      description: pageMeta.description,
      inLanguage: "es",
    };

    const structuredData = [personSchema, websiteSchema];
    let script = document.getElementById("portfolio-structured-data");

    if (!script) {
      script = document.createElement("script");
      script.id = "portfolio-structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(structuredData);

    document.title = pageMeta.title;
    setMetaTag('meta[name="description"]', { name: "description" }, pageMeta.description);
    setMetaTag('meta[property="og:title"]', { property: "og:title" }, pageMeta.title);
    setMetaTag('meta[property="og:description"]', { property: "og:description" }, pageMeta.description);
    setMetaTag('meta[property="og:type"]', { property: "og:type" }, "website");
    setMetaTag('meta[property="og:url"]', { property: "og:url" }, `https://mirgelysserrano.com${basePath}`);
    setMetaTag('meta[property="og:image"]', { property: "og:image" }, "/og-image.svg");
    setMetaTag('meta[property="og:image:alt"]', { property: "og:image:alt" }, pageMeta.title);
    setMetaTag('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    setMetaTag('meta[name="twitter:title"]', { name: "twitter:title" }, pageMeta.title);
    setMetaTag('meta[name="twitter:description"]', { name: "twitter:description" }, pageMeta.description);
    setMetaTag('meta[name="twitter:image"]', { name: "twitter:image" }, "/og-image.svg");
    setCanonicalLink(basePath);
  }, [location.pathname]);

  return null;
};

const AppRouter = () => {
  return (
    <>
      <StructuredData />
      <Suspense fallback={<RouteLoadingSkeleton />}>
        <Routes>
          <Route path="/" element={<AppLayouts />}>
            <Route index element={<About />} />
            <Route path="about" element={<About />} />
            <Route path="resume" element={<Resume />} />
            <Route path="work" element={<Work />} />
            <Route path="contact" element={<Contact />} />
            <Route path="detalle/:id" element={<ProjectDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRouter;

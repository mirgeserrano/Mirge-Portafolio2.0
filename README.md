# Mirge Portafolio

## Mapa del proyecto

La aplicación está organizada por responsabilidad:

```text
src/
├── assets/                  Iconos SVG y recursos visuales reutilizables
├── components/
│   ├── navigation/          Navbar, navegación de contenido, footer y modo oscuro
│   ├── profile/             Perfil lateral, foto, redes y datos de contacto
│   ├── projects/            Tarjetas, listado y detalle de proyectos
│   └── technology/          Stack tecnológico de la página Sobre mí
├── data/                    Información editable en JSON
├── layouts/                 Estructura general de la aplicación
├── pages/                   Pantallas completas: About, Work, Resume y Contact
└── router/                  Rutas de React Router
```

## Dónde editar cada cosa

- Proyectos: `src/data/projects.json`
- Servicios de “Sobre mí”: `src/data/services.json`
- Pantalla de proyectos: `src/pages/Work.jsx`
- Pantalla “Sobre mí”: `src/pages/About.jsx`
- Tecnologías: `src/components/technology/TechStack.jsx`
- Perfil lateral: `src/components/profile/ProfileSidebar.jsx`
- Estilos globales: `src/index.css`

## Recorrido principal

`src/main.jsx` inicia React y carga `App.jsx`. El router monta `AppLayouts`, que combina el perfil lateral, la navegación y la página activa mediante `Outlet`.

## Comandos

```bash
npm run dev
npm run lint
npm run build
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

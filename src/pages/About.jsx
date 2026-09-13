import TechStack from "../components/technology/TechStack";
import { Back, Bd, Brain, BriefCase, Debug, Front } from "../assets";
import services from "../data/services.json";
import { aboutContent } from "../content/siteContent";

const serviceIcons = { Front, Back, Bd, Debug };
const strengths = [
  { label: "Desarrollo", detail: "Full Stack", Icon: Front },
  { label: "Enfoque en", detail: "Calidad", Icon: BriefCase },
  { label: "Soluciones", detail: "a medida", Icon: Brain },
];

const About = () => {
  return (
    <>
      <section className="about-hero">
        <div className="flex flex-col items-center text-center">
          <h1 className="about-title">
            {aboutContent.title}
            <br />
            que generan <strong>{aboutContent.highlight}</strong>
          </h1>
          <p className="about-intro">{aboutContent.intro}</p>
          <div className="about-strengths">
            {strengths.map(({ label, detail, Icon }) => (
              <div className="about-strength" key={label}>
                <span className="about-strength-icon">
                  <Icon />
                </span>
                <span>
                  <b>{label}</b>
                  <small>{detail}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="about-services">
        <h2 className="about-section-title">
          <span aria-hidden="true" />
          {aboutContent.strengthsLabel}
          <span aria-hidden="true" />
        </h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];

            return (
              <div
                key={service.id}
                className="about-service-card flex flex-col md:flex-row md:items-center gap-6 dark:bg-transparent rounded-[22px] px-8 py-9 md:px-11"
                style={{
                  backgroundColor: service.backgroundColor,
                  borderColor: service.borderColor,
                  borderBottomColor: service.accentColor,
                }}
              >
                <div className="flex shrink-0 justify-center">
                  <span
                    className="about-service-icon rounded-full bg-white dark:bg-[#212425] justify-center flex items-center"
                    style={{ borderColor: service.borderColor }}
                  >
                    <Icon />
                  </span>
                </div>

                <div className="flex flex-col">
                  <h3
                    className="dark:text-white font-semibold"
                    style={{ color: service.accentColor }}
                  >
                    {service.title}
                  </h3>
                  <div className="text-gray-lite dark:text-[#A6A6A6]">
                    {service.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TechStack />
    </>
  );
};

export default About;

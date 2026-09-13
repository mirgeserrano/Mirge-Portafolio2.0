import { Brain, BriefCase, Flecha, Graduation, Line } from "../assets";
import { useState } from "react";
import { resumeContent } from "../content/siteContent";

const Resume = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (index) => {
    setActiveSection((current) => (current === index ? null : index));
  };

  return (
    <div>
      <h1 className="text-6xl dark:text-white font-bold mb-12 md:mb-[30px] pl-4 md:pl-[60px] pt-12">
        {resumeContent.title} <Line />
      </h1>
      <div className="pb-12 px-2 sm:px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-6 mt-[30px] ">
          <div className="">
            <div className="flex p-4">
              <Graduation />
              <h4 className="text-4xl dark:text-white font-medium">
                {resumeContent.studiesTitle}
              </h4>
            </div>

            {resumeContent.studies.map((study) => (
              <div
                key={study.year + study.title}
                className="resume-card flex flex-wrap p-6 rounded-lg mb-4 border border-transparent dark:border-[#3c3a40] dark:bg-[#1b1b1d]"
                style={{ backgroundColor: study.tone }}
              >
                <div className="space-y-2">
                  <h5 className="resume-card-year text-gray-500 dark:text-[#d9d4df] text-lg">
                    {study.year}
                  </h5>
                  <h3 className="resume-card-title dark:text-white text-xl font-semibold">
                    {study.title}
                  </h3>
                  <div className="resume-card-detail leading-8 text-gray-lite dark:text-[#d9d4df]">
                    {study.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex p-4 ">
              <BriefCase />
              <h4 className=" text-4xl dark:text-white font-medium">
                {resumeContent.experienceTitle}
              </h4>
            </div>
            {resumeContent.experience.map((section, index) => (
              <div
                key={section.company}
                className="resume-card p-6 rounded-lg mb-4 border border-transparent dark:border-[#3c3a40] dark:bg-[#1b1b1d] dark:text-white"
                style={{ backgroundColor: section.tone }}
              >
                <button
                  type="button"
                  className="flex justify-between items-center gap-3 w-full text-left"
                  onClick={() => handleSectionClick(index)}
                  aria-expanded={activeSection === index}
                >
                  <span className="text-xl font-bold dark:text-white">
                    {section.company}
                  </span>
                  <span
                    className={`transition-transform duration-300 ${activeSection === index ? "rotate-180" : "rotate-0"}`}
                    aria-hidden="true"
                  >
                    <Flecha />
                  </span>
                </button>

                <div className="flex p-2 rounded-lg">
                  {activeSection === index && (
                    <div className="space-y-2">
                      <h5 className="resume-card-year text-gray-500 dark:text-[#d9d4df] text-lg">
                        {section.period}
                      </h5>
                      <h3 className="resume-card-role text-gray-600 dark:text-white text-md font-semibold">
                        <span className="font-bold">{section.role}</span>
                      </h3>
                      <div className="resume-card-detail leading-8 text-gray-lite dark:text-[#d9d4df]">
                        {section.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex p-4">
          <Brain />
          <h4 className="text-4xl dark:text-white font-medium">
            {resumeContent.skillsTitle}
          </h4>
        </div>
        <div className="p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]">
          <div className="flex flex-wrap justify-between p-4">
            {resumeContent.skills.map((skill, index) => {
              const palette = ["#FFFDF5", "#FFF0F0", "#E9F8FF", "#FCF4FF"];
              const color = palette[index % palette.length];

              return (
                <h2
                  key={skill}
                  className="m-4 p-2 shadow-lg inline-block dark:bg-[#1D1D1D] rounded-lg dark:text-[#A6A6A6] dark:border dark:border-red-50"
                  style={{ backgroundColor: color }}
                >
                  {skill}
                </h2>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;

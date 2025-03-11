"use client";

import { useEffect, useState } from "react";

export default function Main() {
  const [activeSection, setActiveSection] = useState("home");
  const [navOffset, setNavOffset] = useState(0);
  const [openProject, setOpenProject] = useState(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      setNavOffset(
        (prev) => prev + (window.scrollY > lastScrollY ? 0.5 : -0.5)
      );

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 프로젝트 데이터 선언 (id 수정)
  const projects = [
    {
      id: 1,
      name: "Project One",
      desc: "Description for project one.",
      tech: ["React", "Tailwind", "Next.js"],
      img: "/img/project1.png",
    },
    {
      id: 2,
      name: "Project Two",
      desc: "Description for project two.",
      tech: ["Vue", "Node.js", "Express"],
      img: "/img/project2.png",
    },
    {
      id: 3,
      name: "Project Three",
      desc: "Description for project three.",
      tech: ["Angular", "TypeScript", "Firebase"],
      img: "/img/project3.png",
    },
  ];

  const week1 = {
    id: 1,
    name: "Week 1",
    desc: "This is the first week's assignment, focusing on fundamental design and development skills.",
    img: "/img/week1.png",
  };

  return (
    <div className="w-full h-screen snap-y snap-mandatory overflow-auto">
      <nav
        className="fixed top-12 left-1/2 transform -translate-x-1/2 flex space-x-10 z-50"
        style={{ transform: `translateY(${navOffset}px)` }}
      >
        {["home", "about", "project", "graduation"].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className={`text-gray-500 text-lg font-semibold transition-colors ${
              activeSection === section ? "text-red-500" : ""
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
      </nav>

      <section
        id="home"
        className="h-screen flex items-center justify-center snap-start bg-black relative"
      >
        <div className="flex items-center justify-center w-full h-full">
          <img
            src="/img/HomeTitle.png"
            alt="Home Title"
            className="w-2/3 h-auto"
          />
        </div>
        {/* 좌측 하단 문구 */}
        <div className="absolute bottom-10 left-10 text-white text-sm text-left">
          <p className="mt-3">
            DESIGN
            <br />
            PORTFOLIO
          </p>
          <p className="mt-3">
            JEONGYEON BAE
            <br />
            jeongyeongbae0422@gmail.com
          </p>
        </div>
        {/* 우측 하단 문구 */}
        <div className="absolute bottom-10 right-10 text-white text-sm text-right">
          <p className="mt-3">
            UIUX DESIGNER
            <br />
            FRONTEND DEVELOPER
          </p>
        </div>
      </section>

      <section
        id="about"
        className="h-screen flex items-center justify-center snap-start bg-white"
      >
        <div className="flex flex-col items-center md:flex-row md:items-start w-3/4 max-w-5xl">
          <div className="w-full md:w-full flex justify-start md:-ml-20 md:-mt-20">
            <img
              src="/img/AboutTitle.png"
              alt="About Title"
              className="w-100 h-auto"
            />
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-10 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800">About Me</h2>
            <p className="mt-4 text-lg text-gray-600">
              안녕하세요! 저는 UIUX 디자이너이자 프론트엔드 개발자인
              배정연입니다. 사용자 경험을 중심으로 한 디자인을 연구하며,
              인터랙티브한 웹 경험을 개발하는 것에 관심이 많습니다.
            </p>
          </div>
        </div>
      </section>

      <section
        id="project"
        className="h-screen flex items-center justify-center snap-start bg-white"
      >
        <div className="grid grid-cols-3 gap-6 w-3/4 max-w-5xl">
          {projects.map((project, index) => (
            <div
              key={`${project.id}-${index}`} // 수정된 부분
              className="bg-gray-200 p-4 rounded-lg cursor-pointer"
              onClick={() =>
                setOpenProject(openProject === project.id ? null : project.id)
              }
            >
              <img
                src={project.img}
                alt={project.name}
                className="w-full h-auto rounded-md"
              />
              <h3 className="text-lg font-bold mt-2">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.desc}</p>
              {openProject === project.id && (
                <div className="mt-2 p-2 bg-white shadow-lg rounded-lg">
                  <h4 className="text-sm font-semibold">Tech Stack:</h4>
                  <ul className="list-disc ml-4">
                    {project.tech.map((tech, index) => (
                      <li key={index} className="text-sm text-gray-500">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section
        id="graduation"
        className="h-screen flex items-center justify-center snap-start bg-white"
      >
        <div className="w-3/4 max-w-5xl bg-gray-200 p-4 rounded-lg text-center">
          <img
            src={week1.img}
            alt={week1.name}
            className="w-full h-auto rounded-md"
          />
          <h3 className="text-lg font-bold mt-2">{week1.name}</h3>
          <p className="text-sm text-gray-600">{week1.desc}</p>
        </div>
      </section>
    </div>
  );
}

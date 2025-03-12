"use client";

import { useEffect, useState } from "react";

// 모달 컴포넌트
function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="bg-white p-10 rounded-lg w-4/5 max-w-4xl h-auto max-h-[95vh] relative shadow-lg"
        style={{
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`::-webkit-scrollbar { display: none; }`}</style>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

// 메인 페이지 컴포넌트
export default function Main() {
  const [activeSection, setActiveSection] = useState("home");
  const [navOffset, setNavOffset] = useState(0);
  const [openProject, setOpenProject] = useState(null);
  const [openWeek, setOpenWeek] = useState(false);

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

  const projects = [
    {
      id: 1,
      name: "우리집 히어로즈",
      desc: "벌레 퇴치를 위한 영웅 매칭을 도와주는 '우리집 히어로즈'",
      tech: ["ReactNative", "TypeScript", "Design"],
      img: "/img/project1.png",
      github: "https://github.com/team-MyHouseHeroes",
    },
    {
      id: 2,
      name: "Inspace",
      desc: "공감각적 아카이빙 서비스",
      tech: ["React", "TypeScript", "Design"],
      img: "/img/project2.png",
      github: "https://github.com/2024-2-SOLUX-in-space",
    },
    {
      id: 3,
      name: "EmoSphere",
      desc: "감정의 시청각적 해소를 돕는 AR 공간",
      tech: ["C#", "Unity", "Design"],
      img: "/img/project3.png",
      github: "https://github.com/2024-2-HCI-Project",
    },
  ];

  const week1 = {
    id: 1,
    name: "Graduation Project Week1",
    desc: "디자인 철학 및 취업 희망 기업 공고 분석",
  };

  return (
    <>
      {/* 메뉴바 (버튼 없이 텍스트로만 표시) */}
      <nav
        className="fixed top-10 left-1/2 transform -translate-x-1/2 flex space-x-8 text-lg font-semibold z-50 text-gray-500"
        style={{ transform: `translateY(${navOffset}px)` }}
      >
        {["home", "about", "project", "graduation"].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className={`transition-colors ${
              activeSection === section ? "text-red-500" : ""
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
      </nav>

      <div className="w-full h-screen snap-y snap-mandatory overflow-auto">
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
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-200 p-4 rounded-lg cursor-pointer"
                onClick={() => setOpenProject(project)}
              >
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-auto rounded-md"
                />
                <h3 className="text-lg font-bold mt-2">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {openProject && (
          <Modal onClose={() => setOpenProject(null)}>
            <img
              src={openProject.img}
              alt={openProject.name}
              className="w-full h-auto rounded-md mb-4"
            />
            <h2 className="text-3xl font-bold mb-4">{openProject.name}</h2>
            <p className="text-lg text-gray-500 mb-4">{openProject.desc}</p>
            <h3 className="text-xl font-bold mb-2">기술 스택</h3>
            <ul className="list-disc ml-6 text-gray-700">
              {openProject.tech.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
            <a
              href={openProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 text-blue-500 hover:underline text-lg"
            >
              GitHub Repository
            </a>
          </Modal>
        )}

        <section
          id="graduation"
          className="h-screen flex items-center justify-center snap-start bg-white"
        >
          <div
            className="w-3/4 max-w-5xl bg-gray-200 p-4 rounded-lg text-center cursor-pointer"
            onClick={() => setOpenWeek(true)}
          >
            <h3 className="text-lg font-bold mt-2">{week1.name}</h3>
            <p className="text-sm text-gray-600">{week1.desc}</p>
          </div>
        </section>
      </div>

      {/* Graduation Project Week1 모달 추가 */}
      {openWeek && (
        <Modal onClose={() => setOpenWeek(false)}>
          <h2 className="text-3xl font-bold mb-6">{week1.name}</h2>
          <p className="text-lg text-gray-500 mb-6">{week1.desc}</p>

          <h3 className="text-2xl font-semibold mt-4">디자인 철학</h3>
          <p className="mt-4 text-gray-700">
            디자인은 단순한 미적 요소를 넘어, 사용자 경험을 개선하고 가치를
            창출하는 핵심적인 도구입니다.
            <br />
            나는 사용자 중심 디자인, 데이터 기반 디자인, 기술 융합 디자인을
            중심으로, 더 직관적이고 효율적인 인터페이스를 만들고자 합니다.
            <br />
            디자인은 단순히 보기 좋은 것이 아니라, 사용자가 쉽게 이해하고,
            편리하게 사용할 수 있으며, 기술적으로도 최적화된 상태여야 합니다.
          </p>

          <h3 className="text-xl font-bold mt-6">
            1. 사용자 중심 디자인 (User-Centered Design, UCD)
          </h3>
          <p className="mt-2 text-gray-700">
            모든 디자인은 사용자의 경험을 최우선으로 고려해야 합니다.
            <br />
            나는 사용자의 행동을 이해하고, 불편함을 최소화하는 UI/UX를 설계하는
            것을 목표로 합니다.
          </p>

          <h3 className="text-xl font-bold mt-6">
            2. 데이터 기반 디자인 (Data-Driven Design)
          </h3>
          <p className="mt-2 text-gray-700">
            디자인을 감각적 판단에만 의존하는 것이 아니라, 데이터를 활용하여
            객관적인 의사 결정을 내리는 것을 중요하게 생각합니다.
          </p>

          <h3 className="text-xl font-bold mt-6">
            3. 기술 융합 디자인 (Tech-Integrated Design)
          </h3>
          <p className="mt-2 text-gray-700">
            디자인과 기술의 결합을 통해 더 혁신적이고 스마트한 사용자 경험을
            제공하는 것을 목표로 합니다.
          </p>

          <h3 className="text-2xl font-semibold mt-6">
            취업 희망 기업 공고 분석
          </h3>
          <ul className="list-disc ml-6 mt-4 text-gray-700">
            <li className="text-lg font-medium">
              2025 팀네이버 신입 공채 : Design
              <p className="mt-4 text-gray-700">
                UI·UX 디자인, 그래픽 디자인, 영상 디자인 등 다양한 직무를
                모집하며, 신입 지원자를 대상으로 합니다. 프론트엔드 개발 능력이
                있다면 큰 강점이 될 수 있습니다.
              </p>
            </li>
            <li className="text-lg font-medium">
              토스페이먼츠의 Product Designer [Tools]
              <p className="mt-4 text-gray-700">
                테스트 자동화 도구를 개발하고 UX 설계를 담당하는 역할입니다.
                사용자의 정량적·정성적 데이터 분석과 문제 해결 능력이
                중요합니다.
              </p>
            </li>
            <li className="text-lg font-medium">
              팀스파르타의 웹 디자이너
              <p className="mt-4 text-gray-700">
                웹 디자인 및 퍼블리싱 경험을 우대하며, UI·UX 디자인과 인터랙션을
                위한 프로토타이핑 제작 경험이 요구됩니다.
              </p>
            </li>
          </ul>
        </Modal>
      )}
    </>
  );
}

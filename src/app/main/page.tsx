"use client";

import { useEffect, useState } from "react";

export default function Main() {
  const [activeSection, setActiveSection] = useState("home");
  const [navOffset, setNavOffset] = useState(0);

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

  return (
    <div className="w-full h-screen snap-y snap-mandatory overflow-auto">
      {/* 네비게이션 바 (모든 섹션에서 항상 보이도록 수정) */}
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

      {/* 섹션들 */}
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
          {/* 왼쪽 - 이미지 (더 왼쪽으로 이동 & 위쪽으로 이동) */}
          <div className="w-full md:w-full flex justify-start md:-ml-20 md:-mt-20">
            <img
              src="/img/AboutTitle.png"
              alt="About Title"
              className="w-100 h-auto"
            />
          </div>

          {/* 오른쪽 - 소개 텍스트 */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-10 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800">About Me</h2>
            <p className="mt-4 text-lg text-gray-600">
              안녕하세요! 저는 UIUX 디자이너이자 프론트엔드 개발자인
              배정연입니다. 사용자 경험을 중심으로 한 디자인을 연구하며,
              인터랙티브한 웹 경험을 개발하는 것에 관심이 많습니다.
            </p>
            <p className="mt-2 text-lg text-gray-600">
              HTML, CSS, JavaScript, React, Next.js 등을 활용하여 다양한
              프로젝트를 진행하였으며, 디지털 디자인과 개발을 접목하는 작업을
              즐깁니다.
            </p>
          </div>
        </div>
      </section>

      <section
        id="project"
        className="h-screen flex items-center justify-center snap-start bg-white"
      >
        <h2 className="text-4xl">Project</h2>
      </section>

      <section
        id="graduation"
        className="h-screen flex items-center justify-center snap-start bg-white"
      >
        <h2 className="text-4xl">Graduation Project</h2>
      </section>
    </div>
  );
}

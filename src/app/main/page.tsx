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
        <h2 className="text-4xl">About Me</h2>
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

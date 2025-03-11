"use client"; // Next.js에서는 스크롤 이벤트를 다룰 때 client component 필요

import { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          window.history.replaceState(null, "", `#${section.id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-screen snap-y snap-mandatory overflow-scroll">
      {/* 홈 */}
      <section
        id="home"
        className="h-screen flex items-center justify-center snap-start"
      >
        <h1 className="text-5xl font-bold">UIUX 디자이너 배정연입니다.</h1>
      </section>

      {/* About */}
      <section
        id="about"
        className="h-screen flex items-center justify-center snap-start bg-gray-100"
      >
        <h2 className="text-4xl">About Me</h2>
      </section>

      {/* Project */}
      <section
        id="project"
        className="h-screen flex items-center justify-center snap-start bg-gray-200"
      >
        <h2 className="text-4xl">Project</h2>
      </section>

      {/* Graduation Project */}
      <section
        id="graduation"
        className="h-screen flex items-center justify-center snap-start bg-gray-300"
      >
        <h2 className="text-4xl">Graduation Project</h2>
      </section>
    </div>
  );
}

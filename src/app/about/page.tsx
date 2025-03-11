"use client";

import Image from "next/image";

export default function About() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center md:flex-row md:items-start w-3/4 max-w-5xl">
        {/* 왼쪽 - 이미지 */}
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src="/img/AboutTitle.png"
            alt="About Title"
            width={250}
            height={250}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* 오른쪽 - 소개 텍스트 */}
        <div className="w-full md:w-2/3 mt-6 md:mt-0 md:ml-10 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800">About Me</h2>
          <p className="mt-4 text-lg text-gray-600">
            안녕하세요! 저는 UIUX 디자이너이자 프론트엔드 개발자인 배정연입니다.
            사용자 경험을 중심으로 한 디자인을 연구하며, 인터랙티브한 웹 경험을
            개발하는 것에 관심이 많습니다.
          </p>
          <p className="mt-2 text-lg text-gray-600">
            HTML, CSS, JavaScript, React, Next.js 등을 활용하여 다양한
            프로젝트를 진행하였으며, 디지털 디자인과 개발을 접목하는 작업을
            즐깁니다.
          </p>
        </div>
      </div>
    </div>
  );
}

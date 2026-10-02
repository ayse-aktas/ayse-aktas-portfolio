"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const logos = [
  {
    name: "Node.js",
    src: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
  },
  {
    name: "React.js",
    src: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
  },
  {
    name: "TypeScript",
    src: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
  },
  {
    name: "JavaScript",
    src: "https://cdn.worldvectorlogo.com/logos/logo-javascript.svg",
  },
  {
    name: "Express",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
  },
  {
    name: "REST API",
    src: "https://cdn-icons-png.flaticon.com/512/270/270798.png",
  },
  { name: "Next.js", src: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
  { name: "NestJS", src: "https://cdn.worldvectorlogo.com/logos/nestjs.svg" },
  { name: "Git", src: "https://cdn.worldvectorlogo.com/logos/git-icon.svg" },
  {
    name: "PostgreSQL",
    src: "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
  },
  {
    name: "MongoDB",
    src: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
  },
  { name: "HTML5", src: "https://cdn.worldvectorlogo.com/logos/html-1.svg" },
  { name: "CSS3", src: "https://cdn.worldvectorlogo.com/logos/css-3.svg" },
  {
    name: "WebSocket",
    src: "https://cdn-icons-png.flaticon.com/512/5968/5968121.png",
  },
  {
    name: "C++",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
  },
  { name: "C#", src: "https://cdn.worldvectorlogo.com/logos/c--4.svg" },
  {
    name: "Bootstrap",
    src: "https://cdn.worldvectorlogo.com/logos/bootstrap-4.svg",
  },
  {
    name: "Tailwind CSS",
    src: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg",
  },
  {
    name: "Material UI",
    src: "https://cdn.worldvectorlogo.com/logos/material-ui-1.svg",
  },
  {
    name: "ASP.Net Core",
    src: "https://cdn.worldvectorlogo.com/logos/dot-net-core.svg",
  },
  { name: "Python", src: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
  {
    name: "MS SQL",
    src: "https://cdn.worldvectorlogo.com/logos/microsoft-sql-server.svg",
  },
];

export default function TechLogoScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const scrollSpeed = 1;

    let animationFrameId: number;

    const scroll = () => {
      if (!scrollElement) return;

      scrollElement.scrollLeft += scrollSpeed;

      // Sonsuz scroll efekti için: içeriğin yarısına ulaştıysa sıfırla
      if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
        scrollElement.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Dil bazlı başlık
  const titleText =
    language === "tr" ? "KULLANDIĞIM TEKNOLOJİLER" : "MY TECHNOLOGY STACK";

  return (
    <section className={styles.sectionContainer} id="tech" data-theme={theme}>
      <h2 className={styles.title}>{titleText}</h2>
      <div className={styles.scrollerWrapper}>
        <div ref={scrollRef} className={styles.logoScroller}>
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className={styles.logoItem}>
              <Image 
                src={logo.src} 
                alt={`${logo.name} logo`} 
                width={40} 
                height={40} 
                draggable={false} 
              />
              <p className={styles.logoName}>{logo.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const projectsData = {
  tr: [
    {
      id: 1,
      title: "Diyetisyen Web Sistemi (DietApp)",
      shortDescription: "Danışan ve içerik yönetimi için gelişmiş diyetisyen platformu",
      tech: ["Next.js", "TypeScript", "Tailwind", "MongoDB", "Cloudinary"],
      images: ["/images/diet-app.jpg", "/images/diet-app1.jpg"],
      demoUrl: "",
      codeUrl: "",
    },
    {
      id: 2,
      title: "LopMeet",
      shortDescription: "Kurumsal işbirliği ve iletişim için modern mobil uygulama platformu",
      tech: ["Flutter", "Dart", "Go", "Gin", "REST API", "MinIO"],
      images: ["/images/lopmeet1.png", "/images/lopmeet2.png", "/images/lopmeet-logo.png"],
      demoUrl: "https://lopmeet.lopme.net/",
      codeUrl: "",
    },
    {
      id: 3,
      title: "RollCall - Akıllı Yoklama Sistemi",
      shortDescription: "BLE, QR Kod ve ML Kit destekli akıllı mobil yoklama sistemi",
      tech: ["Flutter", "Go", "Supabase", "PostgreSQL", "Firebase"],
      images: ["/rollcallP.jpeg"],
      demoUrl: "",
      codeUrl: "https://github.com/ayse-aktas/rollcall/tree/main/rollcall",
    },
    {
      id: 4,
      title: "Akıllı Ev Sistemi (Smart Home)",
      shortDescription: "Gerçek zamanlı çevresel izleme ve uzaktan kontrol sağlayan IoT sistemi",
      tech: ["Arduino", "NodeMCU", "ThingSpeak", "App Inventor"],
      images: ["/images/SmartHome.png"],
      demoUrl: "",
      codeUrl: "",
    },
    {
      id: 5,
      title: "Pizza Satış Sistemi",
      shortDescription: "Pizza satışları ve sipariş yönetimi için masaüstü uygulaması",
      tech: [".NET", "Windows Forms", "PostgreSQL"],
      images: ["/aa-logo.svg"],
      demoUrl: "",
      codeUrl: "https://github.com/ayse-aktas/Pizza_Satis_Sistemi",
    },
    {
      id: 6,
      title: "Kuaför Yönetim Sistemi",
      shortDescription: "Randevu ve personel yönetimi için web tabanlı sistem",
      tech: ["ASP.NET Core MVC", "Entity Framework", "REST API"],
      images: ["/aa-logo.svg"],
      demoUrl: "",
      codeUrl: "",
    }
  ],
  en: [
    {
      id: 1,
      title: "Dietitian Web System (DietApp)",
      shortDescription: "Advanced dietitian platform for client and content management",
      tech: ["Next.js", "TypeScript", "Tailwind", "MongoDB", "Cloudinary"],
      images: ["/images/diet-app.jpg", "/images/diet-app1.jpg"],
      demoUrl: "",
      codeUrl: "",
    },
    {
      id: 2,
      title: "LopMeet",
      shortDescription: "Modern mobile application platform for corporate collaboration",
      tech: ["Flutter", "Dart", "Go", "Gin", "REST API", "MinIO"],
      images: ["/images/lopmeet1.png", "/images/lopmeet2.png", "/images/lopmeet-logo.png"],
      demoUrl: "https://lopmeet.lopme.net/",
      codeUrl: "",
    },
    {
      id: 3,
      title: "RollCall - Smart Attendance",
      shortDescription: "Smart mobile attendance system with BLE, QR, and ML Kit support",
      tech: ["Flutter", "Go", "Supabase", "PostgreSQL", "Firebase"],
      images: ["/rollcallP.jpeg"],
      demoUrl: "",
      codeUrl: "https://github.com/ayse-aktas/rollcall/tree/main/rollcall",
    },
    {
      id: 4,
      title: "Smart Home System",
      shortDescription: "IoT system for real-time environmental monitoring and remote control",
      tech: ["Arduino", "NodeMCU", "ThingSpeak", "App Inventor"],
      images: ["/images/SmartHome.png"],
      demoUrl: "",
      codeUrl: "",
    },
    {
      id: 5,
      title: "Pizza Sales System",
      shortDescription: "Desktop application for managing pizza sales and customer orders",
      tech: [".NET", "Windows Forms", "PostgreSQL"],
      images: ["/aa-logo.svg"],
      demoUrl: "",
      codeUrl: "https://github.com/ayse-aktas/Pizza_Satis_Sistemi",
    },
    {
      id: 6,
      title: "Hair Salon Management",
      shortDescription: "Web-based system for appointment scheduling and staff management",
      tech: ["ASP.NET Core MVC", "Entity Framework", "REST API"],
      images: ["/aa-logo.svg"],
      demoUrl: "",
      codeUrl: "",
    }
  ],
};

export default function Projects() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = language === "tr" ? projectsData.tr : projectsData.en;
  const viewDemoText = language === "tr" ? "Demo" : "View Demo";
  const viewCodeText = language === "tr" ? "Kod" : "View Code";

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
  }, [projects.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section
      className={`${styles.container} ${theme === "dark" ? styles.darkTheme : ""}`}
      id="projects"
    >
      <h2 className={styles.title}>
        {language === "tr" ? "PROJELERİM" : "MY PROJECTS"}
      </h2>
      
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderViewport}>
          <div 
            className={styles.sliderTrack} 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project) => (
              <div key={project.id} className={styles.slideItem}>
                <div className={styles.projectCard}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      width={800}
                      height={450}
                      className={styles.projectImage}
                    />
                    <div className={styles.imageOverlay}></div>
                  </div>

                  <div className={styles.cardContent}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.shortDescription}</p>

                    <div className={styles.techStack}>
                      {project.tech.map((tech, idx) => (
                        <span key={idx} className={styles.techBadge}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className={styles.cardActions}>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={project.id === 2 ? styles.logoLink : styles.primaryBtn}
                        >
                          {project.id === 2 ? (
                            <Image src="/images/lopmeet-logo.png" alt="LopMeet Logo" width={100} height={30} className={styles.actionLogo} />
                          ) : (
                            viewDemoText
                          )}
                        </a>
                      )}
                      {project.codeUrl && (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.githubLink}
                          aria-label="View Code on GitHub"
                        >
                          <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" fill="currentColor">
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.sliderControls}>
        <button className={styles.sliderBtnLeft} onClick={prevSlide} aria-label="Previous Project">
          &#10094;
        </button>
        <div className={styles.sliderDots}>
          {projects.map((_, idx) => (
            <span 
              key={idx} 
              className={`${styles.dot} ${currentIndex === idx ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
        <button className={styles.sliderBtnRight} onClick={nextSlide} aria-label="Next Project">
          &#10095;
        </button>
      </div>
    </section>
  );
}

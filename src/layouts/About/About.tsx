"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { language } = useLanguage();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(json => setData(json.about))
      .catch(err => console.error("About content load error:", err));
  }, []);

  if (!data) return null;

  const { description, skills, stats } = language === "tr" ? data.tr : data.en;
  const title = language === "tr" ? "HAKKIMDA" : "ABOUT ME";
  const skillsTitle = language === "tr" ? "Yetenekler" : "Skills";

  return (
    <section className={styles.about} id="about">
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      
      <div className={styles.content}>
        <p className={styles.description}>{description}</p>

        <div className={styles.skillsSection}>
          <h3 className={styles.skillsTitle}>{skillsTitle}</h3>
          <div className={styles.skillsGrid}>
            {skills.map((skill: string, idx: number) => (
              <span key={idx} className={styles.skillBadge}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.stats}>
          {stats.map((stat: any, idx: number) => (
            <div key={idx} className={styles.statItem}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statNumber}>{stat.number}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

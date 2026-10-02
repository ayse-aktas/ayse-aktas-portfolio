"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function Main() {
  const { language } = useLanguage();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(json => setData(json.hero))
      .catch(err => console.error("Hero content load error:", err));
  }, []);

  if (!data) return null;

  const { role, intro, name } = language === "tr" ? data.tr : data.en;
  const contactText = language === "tr" ? "İletişime Geç" : "Get in Touch";
  const cvText = language === "tr" ? "Özgeçmiş" : "CV";

  return (
    <section className={styles.hero} id="home">
      <div className={styles.heroContainer}>
        <header className={styles.content}>
          <p className={styles.role}>{role}</p>
          <h1 className={styles.description}>{intro}</h1>
          <p className={styles.name}>{name}</p>

          <div className={styles.actions}>
            <a href="#contact" className={styles.primaryBtn}>{contactText}</a>
            <a href="/cv/AyseAktas.pdf" download className={styles.secondaryBtn}>{cvText}</a>
          </div>
        </header>
        <div className={styles.imageSection}>
          <div className={styles.ovalWrapper}>
            <Image src="/me.jpg" alt="Ayşe AKTAŞ" fill priority className={styles.img} />
          </div>
        </div>
      </div>
    </section>
  );
}

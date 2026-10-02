"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

const images = [
  { src: "/rollcallP.jpeg", alt: "Ayse AKTAS 1" },
  { src: "/me.jpg", alt: "Ayse AKTAS 2" },
  { src: "/me1.jpg", alt: "Ayse AKTAS 3" },
  { src: "/me2.jpg", alt: "Ayse AKTAS 4" },
];

export default function AboutSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = images[currentIndex];

  return (
    <div className={styles.imageWrapper}>
      <Image
        src={currentImage.src}
        alt={currentImage.alt}
        width={300}
        height={300}
        className={styles.profileImage}
        priority
      />
    </div>
  );
}

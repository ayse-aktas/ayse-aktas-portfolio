"use client";

import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navItems = {
    tr: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Hakkımda", href: "#about" },
      { label: "Projeler", href: "#projects" },
      { label: "İletişim", href: "#contact" },
    ],
    en: [
      { label: "Home", href: "/" },
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  };

  const currentItems = language === "tr" ? navItems.tr : navItems.en;

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            AA
          </Link>
          
          <ul className={styles.menu}>
            {currentItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={styles.actions}>
              <button
                onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
                className={styles.navBtn}
                aria-label="Toggle Language"
              >
                {language === "tr" ? "EN" : "TR"}
              </button>
              <button 
                onClick={toggleTheme} 
                className={styles.navBtn}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}



"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Footer() {
  const [year, setYear] = useState("2024");

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(json => {
        if (json.footer && json.footer.year) {
          setYear(json.footer.year);
        }
      })
      .catch(err => console.error("Footer content load error:", err));
  }, []);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.text}>
          &copy; {year} Ayşe AKTAŞ. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

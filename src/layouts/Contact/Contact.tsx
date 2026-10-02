"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { language } = useLanguage();
  const [data, setData] = useState<any>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseStatus, setResponseStatus] = useState<"success" | "error" | "">("");

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(json => setData(json.contact))
      .catch(err => console.error("Contact content load error:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setResponseMsg(
          language === "tr"
            ? "Mesajınız başarıyla iletildi!"
            : "Your message has been sent successfully!"
        );
        setResponseStatus("success");
        setFormData({ fullName: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("API hatası");
      }
    } catch (err) {
      setResponseMsg(
        language === "tr"
          ? "Bir hata oluştu, lütfen mailto:ce.ayseaktas@gmail.com üzerinden ulaşın."
          : "An error occurred, please reach out via mailto:ce.ayseaktas@gmail.com"
      );
      setResponseStatus("error");
    } finally {
      setTimeout(() => {
        setResponseMsg("");
        setResponseStatus("");
      }, 5000);
      setLoading(false);
    }
  };

  if (!data) return null;

  const { subtitle } = language === "tr" ? data.tr : data.en;
  const title = language === "tr" ? "İLETİŞİM" : "CONTACT";

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName">{language === "tr" ? "AD SOYAD" : "NAME"}</label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={styles.input}
              autoComplete="name"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">{language === "tr" ? "E-POSTA" : "EMAIL"}</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
              autoComplete="email"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="subject">{language === "tr" ? "KONU" : "SUBJECT"}</label>
          <input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message">{language === "tr" ? "MESAJ" : "MESSAGE"}</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading
            ? language === "tr" ? "Gönderiliyor..." : "Sending..."
            : language === "tr" ? "Bağlantı Kur" : "Get in Touch"}
        </button>

        {responseMsg && (
          <p className={styles.response} style={{ color: responseStatus === "success" ? "var(--accent-color)" : "#f1592a" }}>
            {responseMsg}
          </p>
        )}
      </form>
    </section>
  );
}

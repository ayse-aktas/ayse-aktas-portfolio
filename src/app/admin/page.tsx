"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";
import Monitoring from "@/components/Admin/Monitoring";
import SecuritySettings from "@/components/Admin/SecuritySettings";

export default function AdminPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"tr" | "en" | "common" | "monitoring" | "security">("tr");

  const [status, setStatus] = useState<{ type: "success" | "error", msg: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const hasToken = document.cookie.includes("admin_token=");
    if (!hasToken) {
      router.push("/admin/login");
      return;
    }

    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch(() => setStatus({ type: "error", msg: "Veriler yüklenemedi!" }));
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setStatus({ type: "success", msg: "Değişiklikler başarıyla kaydedildi!" });
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus({ type: "error", msg: "Kaydetme sırasında bir hata oluştu." });
      }
    } catch (error) {
      setStatus({ type: "error", msg: "Sunucu bağlantı hatası." });
    }
    setSaving(false);
  };

  const logout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  const updateField = (path: string, value: any) => {
    const newContent = { ...content };
    const keys = path.split(".");
    let current = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  const addSkill = (lang: "tr" | "en") => {
    const skill = prompt(lang === "tr" ? "Yeni yetenek ekle:" : "Add new skill:");
    if (skill) {
      const skills = [...content.about[lang].skills, skill];
      updateField(`about.${lang}.skills`, skills);
    }
  };

  const removeSkill = (lang: "tr" | "en", index: number) => {
    const skills = content.about[lang].skills.filter((_: any, i: number) => i !== index);
    updateField(`about.${lang}.skills`, skills);
  };

  if (loading) return (
    <div className={styles.adminContainer}>
      <div className={styles.loading}>
        <span>Yükleniyor...</span>
      </div>
    </div>
  );

  return (
    <div className={styles.adminContainer}>
      {status && (
        <div className={`${styles.alert} ${styles[status.type]}`}>
          {status.msg}
        </div>
      )}

      <header className={styles.header}>
        <h1>Admin Control Panel</h1>
        <div className={styles.headerActions}>
          <button onClick={logout} className={styles.logoutBtn}>Çıkış Yap</button>
          <button onClick={handleSave} disabled={saving} className={styles.saveBtn}>
            {saving ? "Kaydediliyor..." : "Tümü Kaydet"}
          </button>
        </div>
      </header>

      <main className={styles.mainGrid}>
        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab("tr")}
            className={`${styles.tabBtn} ${activeTab === "tr" ? styles.activeTab : ""}`}
          >
            Türkçe İçerik
          </button>
          <button
            onClick={() => setActiveTab("en")}
            className={`${styles.tabBtn} ${activeTab === "en" ? styles.activeTab : ""}`}
          >
            English Content
          </button>
          <button
            onClick={() => setActiveTab("common")}
            className={`${styles.tabBtn} ${activeTab === "common" ? styles.activeTab : ""}`}
          >
            Genel Ayarlar
          </button>
          <button
            onClick={() => setActiveTab("monitoring")}
            className={`${styles.tabBtn} ${activeTab === "monitoring" ? styles.activeTab : ""}`}
          >
            Trafik İzleme
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`${styles.tabBtn} ${activeTab === "security" ? styles.activeTab : ""}`}
          >
            Güvenlik
          </button>
        </div>

        {(activeTab === "tr" || activeTab === "en") && (
          <>
            <section className={styles.section}>
              <h2>Hero Section — {activeTab.toUpperCase()}</h2>
              <div className={styles.inputGroup}>
                <label>Görünen İsim</label>
                <input
                  value={content.hero[activeTab].name}
                  onChange={(e) => updateField(`hero.${activeTab}.name`, e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Rol / Unvan</label>
                <input
                  value={content.hero[activeTab].role}
                  onChange={(e) => updateField(`hero.${activeTab}.role`, e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Giriş Cümlesi</label>
                <textarea
                  className={styles.textarea}
                  value={content.hero[activeTab].intro}
                  onChange={(e) => updateField(`hero.${activeTab}.intro`, e.target.value)}
                />
              </div>
            </section>

            <section className={styles.section}>
              <h2>About Section — {activeTab.toUpperCase()}</h2>
              <div className={styles.inputGroup}>
                <label>Hakkımda Açıklaması</label>
                <textarea
                  className={styles.textarea}
                  value={content.about[activeTab].description}
                  onChange={(e) => updateField(`about.${activeTab}.description`, e.target.value)}
                />
              </div>

              <div className={styles.skillsArea}>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", color: "var(--text-secondary)" }}>
                  Yetenekler (Skills)
                </label>
                <div className={styles.skillsGrid}>
                  {content.about[activeTab].skills.map((skill: string, i: number) => (
                    <div key={i} className={styles.skillItem}>
                      {skill}
                      <button onClick={() => removeSkill(activeTab as any, i)} className={styles.removeSkill}>×</button>
                    </div>
                  ))}
                </div>
                <button onClick={() => addSkill(activeTab as any)} className={styles.addSkillBtn}>+ Yetenek Ekle</button>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Contact Section — {activeTab.toUpperCase()}</h2>
              <div className={styles.inputGroup}>
                <label>İletişim Alt Başlığı</label>
                <input
                  value={content.contact[activeTab].subtitle}
                  onChange={(e) => updateField(`contact.${activeTab}.subtitle`, e.target.value)}
                />
              </div>
            </section>
          </>
        )}

        {activeTab === "common" && (
          <section className={styles.section}>
            <h2>Genel Site Ayarları</h2>
            <div className={styles.inputGroup}>
              <label>Footer Yılı</label>
              <input
                value={content.footer.year}
                onChange={(e) => updateField("footer.year", e.target.value)}
              />
            </div>
          </section>
        )}

        {activeTab === "monitoring" && (
          <section className={styles.section}>
            <Monitoring />
          </section>
        )}

        {activeTab === "security" && (
          <section className={styles.section}>
            <SecuritySettings />
          </section>
        )}
      </main>
    </div>
  );
}

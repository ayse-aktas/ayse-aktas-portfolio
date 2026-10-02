"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [timer, setTimer] = useState(120);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "2fa" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setError("Dğrulama kodunun süresi doldu. Lütfen tekrar deneyin.");
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.requires2FA) {
        setStep("2fa");
        setTimer(120);
      } else {
        setError(data.message || "Hatalı giriş! / Invalid credentials");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.message || "Geçersiz kod!");
      }
    } catch (err) {
      setError("Doğrulama sırasında bir hata oluştu.");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>Admin Paneli</h1>
          <p>{step === "credentials" ? "Lütfen kimliğinizi doğrulayın" : "E-posta kodunu girin"}</p>
        </div>

        {error && <div className={styles.errorAlert}>{error}</div>}

        {step === "credentials" ? (
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label>E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Örn: admin@example.com"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className={styles.loginBtn}>Devam Et</button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className={styles.loginForm}>
            <div className={styles.infoBox}>
              <p><strong>{email}</strong> adresine bir doğrulama kodu gönderdik.</p>
            </div>
            <div className={styles.inputGroup}>
              <label>Doğrulama Kodu</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
                placeholder="6 haneli kod"
                autoFocus
                className={styles.codeInput}
              />
            </div>
            <div className={styles.timerArea}>
              <span>Kalan Süre: <strong>{formatTime(timer)}</strong></span>
            </div>
            <button type="submit" className={styles.loginBtn} disabled={timer === 0}>Doğrula ve Giriş Yap</button>
            <button type="button" onClick={() => setStep("credentials")} className={styles.backBtn}>Geri Dön</button>
          </form>
        )}
      </div>
    </div>
  );
}


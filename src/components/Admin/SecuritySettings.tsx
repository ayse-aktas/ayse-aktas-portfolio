"use client";

import React, { useState } from "react";
import styles from "./SecuritySettings.module.css";

export default function SecuritySettings() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState<"form" | "2fa">("form");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Şifreler eşleşmiyor!");
            return;
        }
        setLoading(true);
        setError("");

        try {
            // Re-use login API logic for 2FA code generation
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: "ce.ayseaktas@gmail.com", password: "password" }), // Dummy trigger
            });
            if (res.ok) setStep("2fa");
            else setError("2FA kodu gönderilemedi.");
        } catch (err) {
            setError("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: "ce.ayseaktas@gmail.com",
                    code,
                    newPassword
                }),
            });

            if (res.ok) {
                setSuccess("Şifreniz başarıyla güncellendi!");
                setStep("form");
                setNewPassword("");
                setConfirmPassword("");
                setCode("");
            } else {
                const data = await res.json();
                setError(data.message || "Geçersiz kod!");
            }
        } catch (err) {
            setError("Güncelleme sırasında bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Güvenlik Ayarları</h2>
                <p className={styles.subtitle}>Admin paneli giriş şifresini buradan güncelleyebilirsiniz.</p>

                {error && <div className={styles.error}>{error}</div>}
                {success && <div className={styles.success}>{success}</div>}

                {step === "form" ? (
                    <form onSubmit={handleRequestReset} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Yeni Şifre</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Yeni Şifre (Tekrar)</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" className={styles.saveBtn} disabled={loading}>
                            {loading ? "Kod Gönderiliyor..." : "Şifreyi Güncelle (2FA Gerekir)"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleConfirmReset} className={styles.form}>
                        <div className={styles.info}>
                            E-postanıza gönderilen 6 haneli doğrulama kodunu girin.
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Doğrulama Kodu</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                                placeholder="123456"
                                className={styles.codeInput}
                            />
                        </div>
                        <button type="submit" className={styles.saveBtn} disabled={loading}>
                            {loading ? "Doğrulanıyor..." : "Değişikliği Onayla"}
                        </button>
                        <button type="button" onClick={() => setStep("form")} className={styles.backBtn}>İptal</button>
                    </form>
                )}
            </div>
        </div>
    );
}

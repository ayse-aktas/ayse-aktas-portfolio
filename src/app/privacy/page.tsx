import React from "react";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="container">
      <Navbar />
      <main style={{ padding: "100px 20px", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "30px", color: "var(--text-primary)" }}>Gizlilik Politikası</h1>
        
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>1. Toplanan Veriler</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Facebook ile giriş yaptığınızda, sadece kimliğinizi doğrulamak amacıyla adınız, profil resminiz ve e-posta adresiniz Meta platformu üzerinden alınmaktadır.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>2. Verilerin Kullanımı</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Bu veriler sadece bu web sitesinin admin paneline güvenli giriş yapmanızı sağlamak için kullanılır. Üçüncü taraflarla asla paylaşılmaz ve reklam amaçlı kullanılmaz.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>3. Veri Silme Talebi</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Verilerinizin sistemimizden silinmesini istiyorsanız, ce.ayseaktas@gmail.com adresinden bizimle iletişime geçebilirsiniz. Talebiniz üzerine tüm giriş kayıtlarınız 24 saat içinde silinecektir.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>4. Çerezler</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Sitemiz, oturumunuzu açık tutmak için geçici teknik çerezler (admin_token) kullanmaktadır.
          </p>
        </section>

        <p style={{ marginTop: "50px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Son Güncelleme: {new Date().toLocaleDateString("tr-TR")}
        </p>
      </main>
      <Footer />
    </div>
  );
}

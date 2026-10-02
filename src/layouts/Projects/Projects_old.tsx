"use client";
import React from "react";
import styles from "./styles.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const projectsData = {
  tr: [
    {
      id: 1,
      title: "Menu Leaf – Dijital Menü Yönetim Sistemi",
      description: ` https://menu-leaf.com/tr
Menu Leaf, restoran, kafe ve benzeri işletmelerin hızlı, kolay ve özelleştirilebilir bir şekilde dijital menüler oluşturmasını sağlayan modern bir web uygulamasıdır. 

🔧 Teknolojiler:
- Next.js (App Router), TypeScript, CSS Modules
- Nest.js + Express.js + PostgreSQL + Docker
- JWT Authentication
- Cloudinary görsel yönetimi

🧩 Temel Özellikler:
✅ Dijital menü oluşturma
✅ QR kod üretimi
✅ Tema & renk özelleştirme
✅ Domain bağlama
✅ Dashboard & istatistik paneli
✅ Çoklu dil desteği

💡 Geliştirme sonrası planlar:
- Stripe ile ödeme entegrasyonu
- PWA dönüşümü

Proje; bileşen bazlı yapıda, TypeScript ile güvenli ve sürdürülebilir bir mimariyle geliştirilmiştir.`,
      images: [
        "/images/nokta-kafe.jpg",
        "/images/doya-doya.jpg",
        "/images/menu-leaf.jpg",
      ],
    },
    {
      id: 2,
      title: "Bilir Nakliyat – Güvenli ve Profeyonel Nakliye Platformu",
      description: `https://bilirnakliyat.net
Bilir Nakliyat, Türkiye’nin her köşesine **sigortalı, güvenli ve zamanında** nakliye hizmeti sunan modern bir web platformudur. Web sitesi; şehir içi, şehirler arası, evden eve, ofis taşıma, hafriyat, paketleme-depolama, ambalaj, parsiyel ve asansörlü taşıma gibi **çeşitli lojistik hizmetlerini** tanıtarak müşterilere **kolay iletişim** ve **talep formu** imkânı sağlar.

✅ **Kilometre Taşları ve Vizyon:**
- “Zamanında taşıma” garantisi ile hizmet sunumu  
- Uzman ekipler ve lojistik altyapı kullanımı  
- Eşyalar sigortalı olarak paketlenir ve taşınır

🔧 **Sitede Yer Alan Teknik ve Yönetimsel Özellikler:**
- Responsive ve kullanıcı dostu ön yüz  
- Teklif talep formu (ad, telefon, e‑posta, taşınma türü, taşıma rotası) 
- “Neden Biz?” bölümü ile kalite, sigorta, uygun fiyat, profesyonel destek vurgusu 
- Çeşitli hizmet kategorileri menü üzerinden erişebilir (şehir içi, şehirler arası, parça eşya, ambar vs.)
- Firma hakkında iletişim bilgileri, adres ve sosyal kanallar açıkça listelenmiş

🌐 **Kullanılan Teknolojiler (Öneri ve Varsayım):**
- Next.js + React ile oluşturulmuş, SEO dostu ve hızlı ön yüz
- Form işlemleri (Teklif formu): Formik veya React Hook Form
- Backend: Node.js + Express (talep verisi yakalama / e‑posta ya da DB’ye yönlendirme)
- MongoDB veya benzeri DB ile talep ve hizmet kayıtları
- Local üzerinden görsel yönetimi
- E‑posta bildirimleri için Nodemailer vb.
- Responsive CSS (Tailwind CSS ya da CSS Modules)

🎯 **Sunulan Hizmetler:**
- Şehir içi / şehirler arası nakliyat  
- Evden eve / ofis taşıma  
- Hafriyat / paketleme & depolama  
- Ambalaj / parsiyel / asansörlü taşımacılık`,
      images: [
        "/images/bilir-nakliyat1.jpg",
        "/images/bilir-nakliyat2.jpg",
        "/images/bilir-nakliyat3.jpg",
      ],
    },
    {
      id: 3,
      title: "Tabu Epic – Eğlenceli Takım Temelli Kelime Oyunu",
      description: `Tabu Epic, iki takım arasında oynanan eğlenceli ve sosyal bir kelime tahmin oyunudur. Oyuncular yasak kelimeleri kullanmadan takım arkadaşlarına kelimeleri açıklamaya çalışır; hızlı tahmin etme üzerine kurulu bu mekanik puanlama sistemine dayanır.

✔️ **Öne çıkan özellikler:**
- Yasak kelimelerle açıklama yapma kuralı
- Takım puanlama sistemi
- Sosyal etkileşimi teşvik eden oyun yapısı 
- Reklam tabanlı ücretsiz kullanım (Contains ads) 

📊 **İstatistikler:**
- Güncelleme: 15 Eylül 2024 
- Uygulama sürümü: 9.0, dosya boyutu ~22 MB 
- Veri toplanmıyor, üçüncü partilere paylaşılmıyor 

🎮 **Kullanıcı deneyimi:**
- Partiler için ideal, yaratıcı açıklamalar sunmayı teşvik ediyor
- Basit arayüz ve kolay öğrenilebilir mekanikler
- Geribildirim sistemleriyle kullanıcı memnuniyetini artırıyor

🎯 **Teknik teknolojiler:**
- **Mobil Önyüz:** React Native ile gelistirilmiş, Android uyumlu
- **Backend:** Express.js veya MongoDB temelinde oturum ve skor yönetimi
- **Reklam:** Google AdMob veya benzeri SDK entegrasyonu

📈 **Potansiyel Geliştirme Alanları:**
- Kullanıcı puanlarına göre liderlik tabloları
- Oynanma analitiği ve kullanıcı etkileşim izleme`,
      images: [
        "/images/tabu-epic.png",
        "/images/tabu.jpg",
        // "/images/tabu-2.jpg",
      ],
    },
    {
      id: 4,
      title: "Diyetisyen Web Sistemi – Danışan ve İçerik Yönetim Platformu",
      description: `Diyetisyen Web Sistemi, beslenme uzmanlarının danışanlarını kolayca takip edebileceği, kişisel diyet programları oluşturabileceği ve sağlıklı yaşamla ilgili içerikler paylaşabileceği gelişmiş bir web platformudur. Sistem aynı zamanda Instagram gönderilerinin otomatik olarak web sitesine entegre edilmesini sağlayarak sosyal medya yönetimini kolaylaştırır.

👤 Rol Tabanlı Giriş Sistemi:
- Admin: Kullanıcı, diyetisyen ve genel sistem kontrolü
- Diyetisyen: Program oluşturma, tarif paylaşma, içerik yönetimi
- Kullanıcı: Kişiye özel diyet programlarını ve tarifleri görüntüleme

🎯 Öne Çıkan Özellikler:
✅ Diyet programı oluşturma  
✅ Haftalık danışan planı takibi  
✅ Tarif oluşturma (görsel, içerik, kalori bilgisi)  
✅ Instagram gönderisi gömme ve eş zamanlı içerik aktarımı  
✅ Tamamen responsive ve mobil uyumlu tasarım  
✅ Admin ve Diyetisyen panelleri  
✅ JWT tabanlı giriş-çıkış ve rol bazlı erişim

🛠️ Teknolojiler:
- Next.js + TypeScript + Tailwind CSS  
- Node.js + Express.js (REST API)  
- MongoDB + Mongoose  
- Formik & Yup ile form kontrolü  
- Cloudinary (görsel yönetimi)  
- JWT Authentication  
- Instagram Embed API (iFrame veya içerik çekme)

Bu platform, hem içerik üretimi hem de danışan takibi anlamında dijital çağda diyetisyenlerin ihtiyaç duyduğu tüm çözümleri bir araya getirir.`,
      images: [
        "/images/diet-app.jpg",
        "/images/diet-app1.jpg",
        "/images/diet-app2.jpg",
      ],
    },
  ],
  en: [
    {
      id: 1,
      title: "Menu Leaf – Digital Menu Management System",
      description: `https://menu-leaf.com/tr
Menu Leaf is a modern web application that enables restaurants, cafes, and similar businesses to create digital menus quickly, easily, and customizable.

🔧 Technologies:
- Next.js (App Router), TypeScript, CSS Modules
- Nest.js + Express.js + PostgreSQL + Docker
- JWT Authentication
- Cloudinary image management

🧩 Core Features:
✅ Create digital menu
✅ QR code generation
✅ Theme & color customization
✅ Domain linking
✅ Dashboard & statistics panel
✅ Multi-language support

💡 Future Plans:
- Stripe payment integration
- PWA conversion

The project is developed with a component-based structure and a secure, maintainable architecture using TypeScript.`,
      images: [
        "/images/nokta-kafe.jpg",
        "/images/doya-doya.jpg",
        "/images/menu-leaf.jpg",
      ],
    },
    {
      id: 2,
      title: "Bilir Nakliyat – Secure and Professional Moving Platform",
      description: `https://bilirnakliyat.net
  Bilir Nakliyat is a modern web platform that provides **insured, secure, and timely** moving services to every corner of Turkey. The website introduces various logistics services such as city, intercity, home-to-home, office moving, excavation, packing-storage, packaging, partial and elevator transport, enabling customers to communicate easily and submit requests.

✅ **Milestones and Vision:**
- Service with “on-time delivery” guarantee
- Use of expert teams and logistics infrastructure
- Items packed and transported with insurance

🔧 **Technical and Administrative Features:**
- Responsive and user-friendly frontend
- Request form (name, phone, email, moving type, moving route)
- Quality, insurance, affordable pricing, and professional support highlighted in “Why Us?” section
- Various service categories accessible via menu (city, intercity, partial cargo, warehouse, etc.)
- Company contact info, address, and social channels clearly listed

🌐 **Technologies Used (Suggestion & Assumption):**
- Built with Next.js + React, SEO-friendly and fast frontend
- Form handling (Request form): Formik or React Hook Form
- Backend: Node.js + Express (capture requests, redirect to email or DB)
- MongoDB or similar DB for request and service records
- Local image management
- Email notifications via Nodemailer etc.
- Responsive CSS (Tailwind CSS or CSS Modules)

🎯 **Offered Services:**
- City/intercity moving  
- Home/office moving  
- Excavation/packing & storage  
- Packaging/partial/elevator transportation`,
      images: [
        "/images/bilir-nakliyat1.jpg",
        "/images/bilir-nakliyat2.jpg",
        "/images/bilir-nakliyat3.jpg",
      ],
    },
    {
      id: 3,
      title: "Tabu Epic – Fun Team-Based Word Guessing Game",
      description: `Tabu Epic is a fun and social word guessing game played between two teams. Players try to describe words to teammates without using forbidden words; this fast-paced mechanic is based on a scoring system.

✔️ **Features:**
- Rule against explaining with forbidden words
- Team scoring system
- Game structure encouraging social interaction
- Ad-supported free usage (Contains ads)

📊 **Statistics:**
- Updated: September 15, 2024
- App version: 9.0, file size ~22 MB
- No data collected or shared with third parties

🎮 **User Experience:**
- Ideal for parties, encourages creative explanations
- Simple interface and easy-to-learn mechanics
- Feedback systems increase user satisfaction

🎯 **Technical Technologies:**
- **Mobile Frontend:** Built with React Native, Android compatible
- **Backend:** Express.js or MongoDB-based session and score management
- **Ads:** Google AdMob or similar SDK integration

📈 **Potential Improvements:**
- Leaderboards by user scores
- Play analytics and interaction tracking`,
      images: [
        "/images/tabu-epic.png",
        "/images/tabu.jpg",
        // "/images/tabu-2.jpg",
      ],
    },
    {
      id: 4,
      title: "Dietitian Web System – Client and Content Management Platform",
      description: `The Dietitian Web System is an advanced web platform where nutritionists can easily follow their clients, create personalized diet programs, and share health-related content. The system also enables automatic integration of Instagram posts into the website, facilitating social media management.

👤 Role-Based Login System:
- Admin: User, dietitian, and overall system control
- Dietitian: Program creation, recipe sharing, content management
- User: View personalized diet programs and recipes

🎯 Key Features:
✅ Diet program creation  
✅ Weekly client plan tracking  
✅ Recipe creation (images, content, calorie info)  
✅ Instagram post embedding and synchronous content transfer  
✅ Fully responsive and mobile-friendly design  
✅ Admin and Dietitian panels  
✅ JWT-based login/logout and role-based access

🛠️ Technologies:
- Next.js + TypeScript + Tailwind CSS  
- Node.js + Express.js (REST API)  
- MongoDB + Mongoose  
- Formik & Yup for form validation  
- Cloudinary (image management)  
- JWT Authentication  
- Instagram Embed API (iFrame or content scraping)

This platform combines all the digital solutions nutritionists need today for content creation and client tracking.`,
      images: [
        "/images/diet-app.jpg",
        "/images/diet-app1.jpg",
        "/images/diet-app2.jpg",
      ],
    },
  ],
};

export default function Projects() {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const projects = language === "tr" ? projectsData.tr : projectsData.en;

  return (
    <section
      className={`${styles.container} ${
        theme === "dark" ? styles.darkTheme : ""
      }`}
      id="projects"
    >
      <h1 className={styles.title}>
        {language === "tr" ? "PROJELERİM" : "MY PROJECTS"}
      </h1>
      <div className={styles.projectList}>
        {projects.map((project) => {
          const lines = project.description.trim().split("\n");
          const firstLine = lines[0].trim();
          const restDescription = lines.slice(1).join("\n");

          return (
            <div key={project.id} className={styles.projectItem}>
              <h2 className={styles.projectTitle}>{project.title}</h2>

              <div className={styles.imagesWrapper}>
                {project.images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`${project.title} image ${idx + 1}`}
                    className={styles.projectImage}
                  />
                ))}
              </div>

              <p className={styles.projectDescription}>
                {firstLine.startsWith("http") ? (
                  <>
                    <a
                      href={firstLine}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      {firstLine}
                    </a>
                    <br />
                    {restDescription}
                  </>
                ) : (
                  project.description
                )}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

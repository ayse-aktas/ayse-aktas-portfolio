
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.css';

const Custom404: React.FC = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/images/error-image.png"
        alt="Error image"
        width={500}
        height={300}
        className={styles.image}
      />
      <h1 className={styles.title}>404 - Sayfa Bulunamadı</h1>
      <p className={styles.description}>
        Aradığınız sayfa mevcut değil. Ana sayfaya dönerek devam edebilirsiniz.
      </p>
      <Link href="/" className={styles.button}>
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

export default Custom404;

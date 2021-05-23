import React from 'react';
import { MainLayout } from '../components/MainLayout';

import styles from '../styles/Home.module.css';

export default function Home() {

  return (
    <>
      <MainLayout title={'GitHub Profile'} keywords={'home page'}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.haeder__title}>Welcome to GitHub Profile</h1>
          </header>
        </div>
      </MainLayout>
    </>
  );
}
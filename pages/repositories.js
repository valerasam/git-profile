import { useState, useEffect } from 'react';
import Link from 'next/link';

import { MainLayout } from "../components/MainLayout";
import styles from '../styles/repositories.module.css';

export default function Repositories() {
  const [repositories, setRepositories] = useState([
    { id: 1, name: 'project1' },
    { id: 2, name: 'project2' }
  ]);

  return (
    <>
      <MainLayout title={'Repositories | GitHub Profile'} keywords='repositories'>
        <h1 className={styles.section__title}>
          This is my own GitHub repositories!
        </h1>
        <section className={styles.section__search}>
          <input className={styles.section__input} type='text' placeholder='Search...' />
        </section>
        <section className={styles.section__repositories}>
          <ul>
            {repositories.map(repository =>
              <li key={repository.id}>
                <Link href={`/repositories/${repository.id}`}>
                  <a>{repository.name}</a>
                </Link>
              </li>
            )}
          </ul>
        </section>
      </MainLayout>
    </>
  );
}
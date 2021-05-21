import React, { useState } from 'react';
import { MainLayout } from '../components/MainLayout';

import styles from '../styles/Home.module.css';

export default function Home() {


  // const [repositoryOwner, setRepositoryOwner] = useState('');
  // const handleOwnerSubmit = (e) => {
  //   // setRepositoryOwner(repositoryOwner)
  //   setRepositoryOwner("");
  // };
  // console.log(repositoryOwner);
  return (
    <>
      <MainLayout title={'GitHub Profile'} keywords={'home page'}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.haeder__title}>Welcome to GitHub Profile</h1>
            {/* <buttnon
              className={styles.input_owner_submit}
              onClick={handleOwnerSubmit}
            >&#128270;
            </buttnon>
            <input
              className={styles.section__search__input_owner}
              type='text'
              placeholder='Search or jump to...'
              value={repositoryOwner}
              onChange={e => setRepositoryOwner(e.target.value)} /> */}
          </header>
        </div>
      </MainLayout>
    </>

  );
}
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/client';
import styles from './mainLayout.module.css';

export function MainLayout({ children, title, keywords }) {
  const [session] = useSession();
  // const [sessionN] = useSession();
  // session ? localStore.setItem(session.accessToken) : console.log("Plese log in for checking repositories!");
  // !session ?} : localStorage.setItem(session.accessToken);
  // // console.log("lStore: ", localStorage);
  // console.log("sessionSet: ", session);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta keywords={"next,javascript,nextjs,react,graqhql,github" + keywords} />
        <meta name="description" content="this is the github profile for searching and browsing their repositories" />
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap" rel="stylesheet"></link>
      </Head>
      <div className={styles.header, styles.header__section}>
        <div className={styles.container}>
          <nav className={styles.header__nav}>
            <h1 className={styles.header__nav__title}>GitHub profile</h1>
            {!session && (
              <>
                <button className={styles.nav__link_signin} onClick={() => signIn()}>Sign in with GitHub</button>
              </>
            )}
            {session && (
              <>
                <Link href={'/'}>
                  <a className={styles.nav__link} >Home</a>
                </Link>
                <Link href={'/repositories'}>
                  <a className={styles.nav__link} >Repositories</a>
                </Link>
                <div className={styles.header__user__info}>
                  <img className={styles.header__user__image} src={session.user.image} />
                  <p className={styles.header__user__name}>Signed in as {session.user.name}</p>
                </div>
                <button className={styles.nav__link_signin} onClick={() => signOut()}>Sign out</button>
              </>
            )}
          </nav>
          <main className={styles.header__main__section}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
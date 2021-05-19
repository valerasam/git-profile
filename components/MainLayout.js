import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from './mainLayout.module.css';

export function MainLayout({ children, title, keywords }) {
  const [session, loading] = useSession();

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
            <Link href={'/'}>
              <a className={styles.nav__link} >Home</a>
            </Link>
            <Link href={'/repositories'}>
              <a className={styles.nav__link} >Repositories</a>
            </Link>
            {!session && (
              <>
                <button className={styles.nav__link_signin} onClick={() => signIn()}>Sign in with GitHub</button>
              </>
            )}
            {session && (
              <>
                Sign in as {session.user.name}<br />
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
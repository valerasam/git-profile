import Link from 'next/link';
import Head from 'next/head';

import styles from './mainLayout.module.css';

export function MainLayout({ children, title, keywords }) {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta keywords={"next,javascript,nextjs,react,graqhql,github" + keywords} />
        <meta name="description" content="this is the github profile for searching and browsing their repositories" />
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet"></link>
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
            <Link href={'https://github.com/login'}>
              <a className={styles.nav__link_signin} >Sign in</a>
            </Link>
          </nav>
          <main className={styles.header__main__section}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
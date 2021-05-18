import { MainLayout } from "../../components/MainLayout";
import styles from './repositories.module.css';

export default function Repositories() {

  return (
    <>
      <MainLayout title={'Repositories | GitHub Profile'} keywords='repositories'>
        <h1 className={styles.section__title}>
          This is my own GitHub repositories!
        </h1>
        <section className={styles.section__search}>
          <input className={styles.section__input} type='text' placeholder='Search...' />
        </section>
      </MainLayout>
    </>
  );
}
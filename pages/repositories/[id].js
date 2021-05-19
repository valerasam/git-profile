import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/idRepositories.module.css';

export default function Repository() {
  const { query } = useRouter();
  return (
    <div className={styles.section__repository}>
      <h1 className={styles.repository__title}>Repository name: {JSON.stringify(query.id)}</h1><br />
      <Link className={styles.repository__button, styles.button_back} href={`/repositories`}><a>Back to repositories</a></Link>
    </div>
  );
}
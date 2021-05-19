import { MainLayout } from "../components/MainLayout";
import styles from '../styles/repositories.module.css';

import { useQuery } from '@apollo/client';
import GET_REPOSITORIES_BY_NAME from '../lib/queries/getRepositoriesByName';
import { initializeApollo } from '../lib/apollo';


export default function Repositories({ repositories }) {
  const { data, error, loading } = useQuery(GET_REPOSITORIES_BY_NAME, {
  });

  if (loading) return <h1>Loading...</h1>;
  if (error || !data) return <h2>Error...</h2>;
  // if (data.repositories.length === 0) return <h2>404 | Repositories Not Found</h2>;

  console.log(data.user.repositories.nodes);
  console.log(data);
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
        </section>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GET_REPOSITORIES_BY_NAME,
  });
  return { props: { initialApolloState: apolloClient.cache.extract() } };
}
import { MainLayout } from "../components/MainLayout";
import styles from '../styles/repositories.module.css';

import Link from 'next/link';

import { useQuery } from '@apollo/client';
import GET_REPOSITORIES_BY_NAME from '../lib/queries/getRepositoriesByName';
import { initializeApollo } from '../lib/apollo';



export default function Repositories() {
  const { data, error, loading } = useQuery(GET_REPOSITORIES_BY_NAME, {
  });

  if (loading) return <h1>Loading...</h1>;
  if (error || !data) return <h2>Error...</h2>;

  console.log('data:', data.user.repositories);

  return (
    <>
      <MainLayout title={'Repositories | GitHub Profile'} keywords='repositories'>
        <h1 className={styles.section__title}>
          This is my own GitHub repositories!
        </h1>
        <section className={styles.section__search}>
          <input className={styles.section__input} type='text' placeholder='Find a repository...' />
        </section>
        <section className={styles.section__repositories}>
          <ul>
            {
              data.user.repositories.nodes.map(node =>
                <li key={node.id}>
                  <Link href={`/repositories/${node.name}`}>
                    <div>
                      <p>{JSON.stringify(node.name)}</p>
                      <p>Updated {JSON.stringify(node.updatedAt)}</p>
                      <div className={styles.repository__language}>
                        <div className="colorL" />
                        <p>{JSON.stringify(node.primaryLanguage.name)}</p>
                      </div>
                    </div>
                  </Link>
                  <style jsx>
                    {`
                      .colorL {
                        background-color: ${node.primaryLanguage.color};
                        height: 13px;
                        width: 13px;
                        border-radius: 100%;
                      }
                    `}
                  </style>
                </li>
              )
            }
          </ul>
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
  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  };
}
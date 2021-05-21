import React, { useState, useEffect } from 'react';
import { MainLayout } from "../components/MainLayout";
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import GET_REPOSITORIES_BY_NAME from '../lib/queries/getRepositoriesByName';
import { initializeApollo } from '../lib/apollo';
import styles from '../styles/repositories.module.css';

export default function Repositories() {
  const { data, error, loading } = useQuery(GET_REPOSITORIES_BY_NAME);
  const [repositorySearch, setRepositorySearch] = useState('');
  const [filteredRepositories, setFilteredRepositories] = useState([]);

  useEffect(() => {
    setFilteredRepositories(
      data.user.repositories.nodes.filter(node => {
        return (node.name).toLowerCase().includes(repositorySearch.toLowerCase());
      })
    );
  }, [repositorySearch, data.user.repositories]);

  if (loading) return <h1>Loading...</h1>;
  if (error || !data) return <h2>Error...</h2>;

  return (
    <>
      <MainLayout title={'Repositories | GitHub Profile'} keywords='repositories'>
        <h1 className={styles.section__title}>
          This GitHub repositories !
        </h1>
        <section className={styles.section__search}>
          <input
            className={styles.search__input_repositories}
            type='text'
            placeholder='Find a repository...'
            onChange={(e) => setRepositorySearch(e.target.value)}
          />
        </section>
        <section className={styles.section__repositories}>
          <ul>
            {
              filteredRepositories.map(node =>
                <li key={node.id}>
                  <Link href={`/repositories/${node.name}`}>
                    <legend className={styles.repository__title}>
                      {node.name}
                    </legend>
                  </Link>
                  <div className={styles.repository}>
                    <div className={styles.repository__info}>
                      <div className={styles.repository__language}>
                        <div className="colorL" />
                        <p className={styles.repository__language_name}>{node.primaryLanguage.name}</p>
                      </div>
                      <p>Updated {new Date(node.updatedAt).toLocaleDateString("en-US")}</p>
                    </div>
                  </div>
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
    props: { initialApolloState: apolloClient.cache.extract() }
  };
}
import React, { useState, useEffect } from 'react';
import { MainLayout } from "../components/MainLayout";
import { useQuery } from '@apollo/client';
import GET_REPOSITORIES_BY_NAME from '../lib/queries/getRepositoriesByName';
import { initializeApollo } from '../lib/apollo';
import styles from '../styles/repositories.module.css';
import Repository from '../components/Repository';
import { useSession } from 'next-auth/client';


export default function Repositories() {
  const [session] = useSession();
  const ownerName = session?.user?.name;
  const { data, error, loading } = useQuery(GET_REPOSITORIES_BY_NAME, {
    variables: { ownerName }
  });
  const [repositories, setRepositories] = useState([]);

  const [repositorySearch, setRepositorySearch] = useState('');
  const [filteredRepositories, setFilteredRepositories] = useState([]);

  useEffect(() => {
    data && setRepositories(
      data.user.repositories.nodes.map(node => {
        return {
          id: node.id,
          name: node.name,
          color: node?.primaryLanguage?.color,
          langName: node?.primaryLanguage?.name,
          date: node.updatedAt
        };
      })
    );
  }, [data]);

  useEffect(() => {
    setFilteredRepositories(
      repositories.filter(item => {
        return (item.name).toLowerCase().includes(repositorySearch.toLowerCase());
      })
    );
  }, [repositorySearch, repositories]);

  if (loading) return (
    <h1 style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "2rem",
      fontSize: "20px",
      fontWeight: "700"
    }}>Loading...</h1>);
  if (error || !data) return (
    <div>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          fontSize: "20px",
          fontWeight: "700"
        }}>
        Error, the data was not found...<br /><br />
        Please, sign in to GitHub!</h2>
      <a
        href={`/api/auth/signin`}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          fontSize: "18px",
          fontWeight: "600"
        }}>
        Go to sign in page
        </a>
    </div>
  );


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
          <ul className={styles.section__repositories_list}>
            {filteredRepositories.map((item) =>
              <Repository key={item.id} data={{ ...item }} />)}
          </ul>
        </section>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  return {
    props: { initialApolloState: apolloClient.cache.extract() }
  };
}
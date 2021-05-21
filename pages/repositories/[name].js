import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '../../lib/apollo';
import GET_REPOSITORY_BRANCHES from '../../lib/queries/getRepositoryBranches';

import styles from '../../styles/idRepositories.module.css';

export default function Repository() {
  const router = useRouter();
  const queryName = router.query.name;
  const { data, loading, error } = useQuery(GET_REPOSITORY_BRANCHES, { variables: { queryName } });

  if (loading) return <h1>Loading...</h1>;
  if (error || !data) return <h2>Error...</h2>;

  console.log("Name:", data.user.repository);

  return (
    <div className={styles.repository__wrapper}>
      <div className={styles.section__repository}>
        <div className={styles.repository__header}>
          <h1 className={styles.repository__title}>
            Repository name: {queryName}
          </h1>
          <div className={styles.repository__main__info}>
            {
              data.user.repository.refs.edges.forEach(node =>
                console.log("noode:", node.branchName)
              )
            }
            <select className={styles.repository__info__branches}>
            </select>
            <input
              type='text'
              name='clone_url'
              className={styles.repository__info__link}
              value='Link etc...'
              readOnly={true}
            />
          </div>

        </div>
        <br />
        <Link className={styles.repository__button, styles.button_back} href={`/repositories`}><a>Back to repositories</a></Link>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  // await apolloClient.query({
  //   query: GET_REPOSITORY_BRANCHES
  // });
  return {
    props: { initialApolloState: apolloClient.cache.extract() }
  };
};

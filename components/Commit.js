import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import GET_REPOSITORY_COMMIT from '../lib/queries/getRepositoryCommit';
import styles from './Commit.module.css';
import { useSession } from 'next-auth/client';


export default function Commit() {
  const router = useRouter();
  const [session] = useSession();
  const repoName = router.query.name;
  const ownerName = session.user.name;
  const { data, loading, error } = useQuery(GET_REPOSITORY_COMMIT, { variables: { repoName, ownerName } });
  const [commitData, setCommitData] = useState([]);

  useEffect(() => {
    if (data) {
      setCommitData(data.repository.defaultBranchRef.target.history.edges);
    }
  }, [data]);

  if (loading) return <h1>Loading...</h1>;
  if (error || !data) return <h2>Error...</h2>;
  return (
    <li className={styles.section__commit}>
      {
        commitData.map(edge => {
          return (
            <div key={edge.node.id} className={styles.commit__item}>
              <div className={styles.commit__name}>
                Commit-name: {edge.node.messageHeadline}
              </div>
              <div className={styles.commit__message}>
                Message: {edge.node.message}
              </div>
              <div className={styles.commit__author_name}>
                Author: {edge.node.author.name}
              </div>
              <div className={styles.commit__author_email}>
                Email: {edge.node.author.email}
              </div>
              <div className={styles.commit__date}>
                Date: {new Date(edge.node.author.date).toLocaleDateString("en-US")}
              </div>
              <div className={styles.commit_underline} />
            </div>
          );
        })
      }
    </li>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  return {
    props: { initialApolloState: apolloClient.cache.extract() }
  };
};

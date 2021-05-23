import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '../../lib/apollo';
import GET_REPOSITORY_BRANCHES from '../../lib/queries/getRepositoryBranches';
import Commit from '../../components/Commit';
import { useSession } from 'next-auth/client';

import styles from '../../styles/nameRepositories.module.css';


export default function Repository() {
  const router = useRouter();
  const [session] = useSession();
  const ownerName = session?.user?.name;
  const queryName = router.query.name;
  const { data, loading, error } = useQuery(GET_REPOSITORY_BRANCHES, { variables: { queryName, ownerName } });
  const [branchData, setBranchData] = useState([]);
  const cloneLink = data?.user?.repository?.url + ".git";
  const [copyInput, setCopyInput] = useState(cloneLink);

  useEffect(() => {
    if (data) {
      setBranchData(data.user.repository.refs.edges);
    }
  }, [data]);

  if (loading) return <h1>Loading...</h1>;
  if (error || !data) return <h2>Error...</h2>;
  return (
    <div className={styles.repository__wrapper}>
      <div className={styles.section__repository}>
        <div className={styles.repository__header}>
          <Link href={`/repositories`}>
            <a className={styles.repository__button__mobile_back}>
              &#10006;
            </a>
          </Link>
          <h1 className={styles.repository__title}>
            Repository name: {queryName}
          </h1>
          <Link href={`/repositories`}>
            <a className={styles.repository__button_back}>
              Back to repositories
            </a>
          </Link>
        </div>
        <div className={styles.repository__main__info}>
          <select className={styles.repository__info__branches}>
            <option>Branches</option>
            {
              branchData.map(edge => {
                return <option key={edge.node.id}>{edge.node.branchName}</option>;
              })
            }
          </select>
          <div className={styles.repository__clone__section}>
            <input
              type='text'
              name='clone_url'
              className={styles.repository__clone__link}
              value={cloneLink ?? copyInput}
              readOnly={true}
              onChange={e => setCopyInput(e.target.value)}
            />
            <CopyToClipboard
              text={cloneLink ?? copyInput}
            >
              <button>
                <img
                  alt="clone image"
                  className={styles.repository__clone__button}
                  src='https://image.flaticon.com/icons/png/512/1621/1621635.png' />
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className={styles.section__repository__commit}>
          <ul>
            <Commit />
          </ul>
        </div>
      </div>
    </div >
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  return {
    props: { initialApolloState: apolloClient.cache.extract() }
  };
};

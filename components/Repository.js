import React from 'react';
import Link from 'next/link';
import styles from './Repository.module.css';

const Repository = ({
  data: { name, color, langName, date }
}) => {
  return (
    <div className={styles.section__repositories}>
      <li>
        <Link
          className={styles.repository__title}
          href={`/repositories/${name}`}>
          <a className={styles.repository__title}>
            {name}
          </a>
        </Link>
        <div className={styles.repository}>
          <div className={styles.repository__info}>
            <div className={styles.repository__language}>
              <div className="colorL" />
              <p className={styles.repository__language_name}>
                {langName}
              </p>
            </div>
            <p>Updated {new Date(date).toLocaleDateString("en-US")}</p>
          </div>
        </div>
        <style jsx>
          {`
        .colorL {
          background-color: ${color};
          height: 13px;
          width: 13px;
          border-radius: 100%;
        }
      `}
        </style>
      </li>
    </div>
  );
};

export default Repository;
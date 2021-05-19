// // import { useState } from 'react';
// // import Link from 'next/link';
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// import { MainLayout } from "../components/MainLayout";
// import styles from '../styles/repositories.module.css';

// export default function Repositories({ repositories }) {
//   // const [repositories, setRepositories] = useState([
//   //   { id: 1, name: 'project1' },
//   //   { id: 2, name: 'project2' }
//   // ]);
//   return (
//     <>
//       <MainLayout title={'Repositories | GitHub Profile'} keywords='repositories'>
//         <h1 className={styles.section__title}>
//           This is my own GitHub repositories!
//         </h1>
//         <section className={styles.section__search}>
//           <input className={styles.section__input} type='text' placeholder='Search...' />
//         </section>
//         <section className={styles.section__repositories}>
//           <ul>
//             {/* {repositories.map(repository =>
//               <li key={repository.id}>
//                 <Link href={`/repositories/${repository.id}`}>
//                   <a>{repository.name}</a>
//                 </Link>
//               </li>
//             )} */}
//           </ul>
//         </section>
//       </MainLayout>
//     </>
//   );
// }

// export async function getStaticProps() {
//   const client = new ApolloClient({
//     uri: 'https://48p1r2roz4.sse.codesandbox.io',
//     cache: new InMemoryCache()
//   });

//   const { data } = await client.query({
//     query: gql`
//       query GetRates {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   });
//   console.log('repositories-name:', data);

//   return {
//     props: {
//       repositories: []
//     }
//   };
// }
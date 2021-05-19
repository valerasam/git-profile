import gql from 'graphql-tag';

const GET_REPOSITORIES_BY_NAME = gql`
      query {
        user(login: "valerasam") {
          url
          repositories(last: 10) {
            nodes {
              name
            }
          }
        }
      }
    `;
export default GET_REPOSITORIES_BY_NAME;
import gql from 'graphql-tag';

const GET_REPOSITORY_BRANCHES = gql`
  query GetRepositoryBranches($queryName: String!, $ownerName: String!){
    user(login: $ownerName) {
      repository(name: $queryName) {
        url
        name
        refs(refPrefix: "refs/heads/", first: 10) {
          edges {
            node {
              id
              branchName:name
            }
          }
        }
      }
    }
  }
`;

export default GET_REPOSITORY_BRANCHES;


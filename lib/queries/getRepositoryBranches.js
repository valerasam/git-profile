import gql from 'graphql-tag';

const GET_REPOSITORY_BRANCHES = gql`
  query GetRepositoryBranches($queryName: String!){
    user(login: "valerasam") {
      repository(name: $queryName) {
        contactLinks{
          url
        }
        name
        refs(refPrefix: "refs/heads/", first: 10) {
          edges {
            node {
              branchName:name
            }
          }
        }
      }
    }
  }
`;

export default GET_REPOSITORY_BRANCHES;


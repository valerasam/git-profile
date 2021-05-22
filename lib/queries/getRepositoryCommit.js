import gql from 'graphql-tag';

const GET_REPOSITORY_COMMIT = gql`
  query GetRepositoryCommit($repoName: String!, $ownerName: String!){
  repository(name: $repoName, owner: $ownerName) {
    ...on Repository {
      defaultBranchRef {
        target {
          ...on Commit {
            history(first: 10) {
              edges {
                node {
                  ...on Commit {
                    messageHeadline
                    message
                    author {
                      name
                      email
                      date
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export default GET_REPOSITORY_COMMIT;



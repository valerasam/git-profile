import gql from 'graphql-tag';


const GET_REPOSITORIES_BY_NAME = gql`
      query Get_Repositories_By_Name($ownerName: String!){
        user(login: $ownerName) {
          avatarUrl
          url
          repositories(last: 10) {
            nodes {
              id
              name
              updatedAt
              primaryLanguage {
                color
                name
              }
            }
          }
        }
      }
    `;
export default GET_REPOSITORIES_BY_NAME;
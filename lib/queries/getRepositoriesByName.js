import gql from 'graphql-tag';


const GET_REPOSITORIES_BY_NAME = gql`
      query Get_Repositories_By_Name{
        user(login: "valerasam") {
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
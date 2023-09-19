import gql from "graphql-tag"

const GET_GARAGES = gql`query {
  getAllGarages {
    owner {
      name
      lastName
    }
  }
}
`
export {GET_GARAGES}

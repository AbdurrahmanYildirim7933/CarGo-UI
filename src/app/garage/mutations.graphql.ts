import gql from "graphql-tag";

const CREATE_GARAGE = gql`
    mutation CreateGarage($dto:GarageDTO){
    createGarage(dto:$dto){
      id
      name
    }
  }
`

export {CREATE_GARAGE};


import gql from "graphql-tag";

const CREATE_GARAGE = gql`
    mutation CreateGarage($dto:GarageDTO){
    createGarage(dto:$dto){
      id
      name
      owner{
        name
      }
    }
  }
`

const GET_GARAGES = gql`
  mutation getGarages($page:Int,$size:Int,$sortBy:String,$sortDirection:String,$garageFilterDTO:GarageFilterDTO){
    getGarages(page:$page,size:$size,sortBy:$sortBy,sortDirection:$sortDirection,garageFilterDTO:$garageFilterDTO){
      garages{
        id
        name
      }
      pages
      count
    }
  }
`

export {CREATE_GARAGE,GET_GARAGES};


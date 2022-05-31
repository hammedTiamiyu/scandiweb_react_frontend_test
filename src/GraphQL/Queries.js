import { gql} from "@apollo/client";




export const LOAD_DATA = gql`
{
    category {
      name
      products {
        id
        name
        inStock
        category
        attributes {
          id
          name
          type
        }
        gallery     
      }
    }
  }
`




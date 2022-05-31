import React, { useEffect, useState } from "react";
// import {useQuery} from '@apollo/client'
// import {LOAD_DATA} from "../GraphQL/Queries"
import {graphql } from "@apollo/client/react/hoc"
import { ApolloCache, gql} from "@apollo/client";
import Product from "./Product";
  
const LOAD_DATA = gql`
{
  category {
    name
    products {
      id
      name
      inStock
      category
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      gallery
    }
  }
}
`

class ProductList extends React.Component{
    constructor(props) {
        super()
        this.state= {
           
        }
    }
   

   render() {
    // const { data: { loading, error, data } } = this.props;
    const {data} = this.props
    const catz = data.category
    let products = []
    let productItem = []
    let catTitile = "clothes"

    if (catz){
      products = catz.products
      
    }
    // const productComponent = productItem.map((items) => <Product key={items.id} item={items} />)
    return(
      <>        
        {products.length!==0 &&(
        <Product item={products} />
        )}
      </>
    )       
   }
    
}
  
  export default graphql(LOAD_DATA)(ProductList)

  
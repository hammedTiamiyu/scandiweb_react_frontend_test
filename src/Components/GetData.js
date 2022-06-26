import React, { useEffect, useState } from "react";
// import {useQuery} from '@apollo/client'
// import {LOAD_DATA} from "../GraphQL/Queries"
import {graphql } from "@apollo/client/react/hoc"
import { gql} from "@apollo/client";
import Product from "./Product";
import GetCategory from "./GetCategory";

  
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
      brand
      description
    }
  }
}
`
// class CategoryBotton extends React.Component{
// render(){
//   return(
//     <header>
//       <div>
        
//       </div>
//     </header>
//   )
// }
// }

class ProductHome extends React.Component{
    constructor(props) {
        super()
        this.state= {
           
        }
    }
   
    
   render() {
    // const { data: { loading, error, data } } = this.props;
    const {data} = this.props
    const category = data.category
    let products = []   

    if (category){
      products = category.products 
      
    }
    // const productComponent = productItem.map((items) => <Product key={items.id} item={items} />)
    return(
      <>        
        {products.length!==0 &&(
        <>
          <GetCategory item={products} />
          <Product item={products} />
        </>
        )}
      </>
    )    
   }
    
}
  
  export default graphql(LOAD_DATA)(ProductHome)

  
  
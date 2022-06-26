import React, {useState, UseEffect, useEffect} from "react";
import {useStateValue} from '../StateProvider'
import {Link, useLocation} from "react-router-dom"
import {useParams} from "react-router-dom"

function ProductCategory () { 

    const [{categories, setCategory, currencyLabel, basket, total}, dispatch] = useStateValue()    
    const [loading, setLoading] = useState(true)
    const [productList, setProductList] = useState({})    
    const queryParams = useParams()
    const products = useLocation().state.item 
    console.log(total)
    
    // console.log(products, queryParams)
        
    useEffect(() => {
        // queryParams && setCatParams(queryParams.category)
        // console.log(catParams);
        setLoading(true)
        queryParams && (
        setProductList(products.filter((items) => items.category === queryParams.category ))        
        )
        productList && console.log(productList);
        setLoading(false)
    },[queryParams, productList.length < 1])

    useEffect(() => {
        dispatch({
          type: "GET_TOTALS"
        })
      },[basket])

    if (loading) {
        return(
            <h4>Loading</h4>
        )
    } else {
        return(
        <main>
            <div>
                {/* category Name/Title */}
              <h1 className="categoryTitle">{queryParams.category}</h1> 
            </div>
            <div className="productList"> 
                {productList &&(
                productList.map((product) => {           
                const {id, name, category, gallery, prices,attributes} = product;
                const amount = 1
                // destructuring prices array
                const priceFilter = prices.filter((price) => price.currency.label === currencyLabel )
                const priceCurrencyLabel = priceFilter[0].currency.symbol       
                const currencyAmount = priceFilter[0].amount
                // const symbol = 
            
                return(
                <div className="product" key={id}>     
                <Link to={{
                    pathname: `/product-details/${id}`,
                 state: {item : {product : product,
                  priceTag : {currencyAmount: currencyAmount, priceCurrencyLabel: priceCurrencyLabel}
                }}
                }} >        
                    <div className="imageContainer" >
                        <img src={gallery[0]} alt={name} style={{minHeight:'150px', maxHeight:"150px", width:'150px'}} />
                    </div>
                    </Link>
                    <div className="productInfo">
                        <p>{name}</p>
                        <h4> {priceCurrencyLabel +" "+ currencyAmount} </h4>                
                    </div>   
                    <div>
                    <button 
                    className="addToBasket" 
                   
                    onClick={() => dispatch({
                        type: "ADD_TO_BASKET", 
                        item:{id, name,attributes, gallery,currencyAmount, priceCurrencyLabel, amount}
                    })}
                    >
                        Add To Basket
                    </button>  
                    </div>           
                </div>          
                )
            })
            )}
            </div>
        </main>

        )}
  
  
}
export default ProductCategory



import React from 'react'
// import {ApolloProvider, use} from "@apollo/client"
import {Link, useParams, useLocation} from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import ItemAttribute from './ItemAttribute'

function ProductDetails() {
  const [{basket},dispatch]= useStateValue()
  const item = useLocation().state.item 
  const product = item.product
  const {id, name, category, gallery, prices,attributes, description} = product
  const {currencyAmount, priceCurrencyLabel} = item.priceTag
  console.log(basket)
  
  // (attributes.name ==="Color" && attributes.type==="swatch") && console.log("Its color");
  
  const amount = 1
  console.log(product);

  
    return(
        <div className='productDetails'>
          <div className='detailImagesContainer'>
            <div className='multipleDetailImages'>
              
            {
              gallery.map((singleGallery, index) =>                  
              <div className='singleGalleryImage'>
                <img className='images'  key={index} src={singleGallery} alt={name}  />                   

              </div>
              )
            }
            </div>
            <div className='detailsBigImageContainer'>
              <img className='detailsImageBig' src={gallery[0]} alt={name}  />
            </div>
          </div>
          {/* ********* Items Details Infomations ************* */}
          <div className='itemDescriptions'>
            <div className='itemDescriptionsName'>
              <h2>{name}</h2>
            </div>
            <div>
              <ItemAttribute attributes={attributes} />
            </div>
            <div>
              <h4>PRICE</h4> 
              <h4>{priceCurrencyLabel + ' ' + currencyAmount}</h4>
            </div>           
            <div className='addToBasketdiv'>
              <button
                  className="addToBasketDetailsBtn" 
                  // style={{padding:'10px', backgroundColor:'#2aa34b', color:'white'}}
                  onClick={() => dispatch({
                    type: "ADD_TO_BASKET", 
                    item:{id, name,attributes,gallery, currencyAmount, priceCurrencyLabel, amount}
                })}
              >
                ADD TO CART
              </button>
            </div>
            <div style={{marginTop: '30px'}} dangerouslySetInnerHTML={{__html: description}} />
                        
          </div>          
        </div>
    )
}

export default ProductDetails
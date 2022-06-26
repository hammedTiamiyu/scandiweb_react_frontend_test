import React from 'react'
import {useStateValue} from '../StateProvider'
import {AiOutlinePlusSquare,AiOutlineMinusSquare} from "react-icons/ai"
// import '../cartStyle.css'

const CartItem = () => {

  const [{basket,currencyLabel, total},dispatch] = useStateValue()
  React.useEffect(() => {
    dispatch({
      type: "GET_TOTALS"
    })
  },[basket])
  return(
 
     
        <div style={{width: '70vw', marginLeft: '20vw', marginTop:'30px'}} >            
            {basket.map((item) => {
                const {id, name, gallery,currencyAmount, priceCurrencyLabel, amount} = item

                return(                   
                    <div className="single_item">
                        {/* Item Info */}
                      <div className="single_item_info">
                          <p>{name}</p>
                          <h4>{priceCurrencyLabel + currencyAmount}</h4>
                          <div>
                            <button>S</button>
                            <button>M</button>
                          </div>
                      </div>
                      {/* Item quantity */}
                      <div className="single_item_quantity">
                        <AiOutlinePlusSquare 
                          onClick={() => dispatch({
                            type: "TOGGLE_AMOUNT", 
                            item: {id:id, type:"inc"}
                          })} 
                        />
                        <p>{amount}</p>
                        <AiOutlineMinusSquare 
                          onClick={() => dispatch({
                            type: "TOGGLE_AMOUNT", 
                            item: {id:id, type:"dec"}
                          })} 
                        />
                      </div> 
                        {/* Item Image */}
                      <div className="single_item_image">
                      <img src={gallery[0]} alt={name} style={{height:'100%', width:'140px'}} />
                      </div>    
                    </div>
                )
            })}      
            <div style={{borderTop:'2px solid grey', heigth:'0px', width:'100%', marginTop:'15px'}}></div> 
            <h2>{basket[0].priceCurrencyLabel + ' ' + total}</h2>                  
          </div>
 
 
  )
}

export default CartItem

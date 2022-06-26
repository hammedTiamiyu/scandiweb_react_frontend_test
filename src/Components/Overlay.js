import { Fragment } from "react";
import "./Overlay.css";
import {useStateValue} from "../StateProvider"
import{Link} from "react-router-dom"
import {AiOutlinePlusSquare,AiOutlineMinusSquare} from "react-icons/ai"

function Overlay({ isOpen, cartItem,onClose }) {

  const [{basket},dispatch] = useStateValue()
  // console.log(basket);

  
  return (
    <Fragment>
      {isOpen && (
        <div className="overlay">
          <div className="overlay__background" onClick={onClose} />
          <div className="overlay__container">  

            {cartItem.map((item) => {
                const {id, name, gallery,currencyAmount, priceCurrencyLabel, amount} = item

                return(                   
                    <div key={id} className="single_item">
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
                        <AiOutlinePlusSquare size={20} 
                            onClick={() => dispatch({
                              type: "TOGGLE_AMOUNT", 
                              item: {id:id, type:"inc"}
                            })} 
                         />
                        <p>{amount}</p>
                        <AiOutlineMinusSquare size={20}
                             onClick={() => dispatch({
                              type: "TOGGLE_AMOUNT", 
                              item: {id:id, type:"dec"}
                            })} 
                        />
                      </div> 
                        {/* Item Image */}
                      <div className="single_item_image">
                      <img src={gallery[0]} alt={name} style={{height:'90%', marginTop : '6% ', width:'95%'}} 
                      />
                      </div>    
                    </div>
                )
            })}  
            <div className="view_bag_container">
              <Link to={{
                pathname: "/view_bag"
              }}>
                  <button onClick={onClose}>VIEW BAG</button>
              </Link>
              <Link to={{
                pathname: "/check_out"
              }}>
                  <button>CHECK OUT</button>
              </Link>
              {/* <button classLLName="nav-buttons" onClick={() => dispatch({type: "EMPTY_BASKET"})}>CLEAR BASKET</button> */}
            </div>                 
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default Overlay
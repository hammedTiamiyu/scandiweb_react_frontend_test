import React, {useState,  useEffect} from "react";
import { Link } from "react-router-dom";
import {useStateValue} from '../StateProvider'
import {FiShoppingCart} from "react-icons/fi"
import {GrAmazon} from "react-icons/gr"
import {BsCurrencyDollar} from "react-icons//bs"
import Overlay from "./Overlay";

function Header() {
  const [{categoryList, currencyList, currencyLabel, products, basket,amount, total}, dispatch] = useStateValue()
  const [category, setCategory] = useState('')
  const [productList, setProductList] = useState([])
 
  const [isOpen, setIsOpen] = useState(false);
  // useEffect(() => {

  // },[])
  useEffect(() => {
    dispatch({
      type: "GET_TOTALS"
    })
  },[basket])

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

    
  return (
    <nav>
      <div className="navigation_bar">
        {/* Categories Container */}
        <div className="button_container">
          {(categoryList) &&(        
            categoryList.map((categoryItem, _index) =>{
              return(
                <Link to={{
                    pathname: `/category/${categoryItem}`,
                    state : {item : products}                    
                  }}              
                >
                  <button
                    className="nav-buttons"
                    // onClick={}
                    key={_index}
                  >
                    {categoryItem}
                  </button>              
                </Link>
              )
            })        
          )}  
        </div>
        
        {/* SELECT CURRENCY */}        
       <div>
        <select className="select_currency" onChange={(e)=> dispatch({type : "SET_CURRENCY", item: e.target.value }) } >
          
          {currencyList &&(
              currencyList.map((currency, index) =>{   
                
              return(
                <option key={index} value={currency.currency.label}>
                {currency.currency.label}
              </option>
              )
              })
            )}
      </select>
      </div>
      <Link to='/'>
        <GrAmazon className="backToHomeBtn" size={25} />
      </Link>
      {/* <button className="nav-buttons" onClick={() => dispatch({type: "EMPTY_BASKET"})}>Clear Basket</button> */}
      <FiShoppingCart size={25} onClick={toggleOverlay} className="cart-overlay" />
      <div className='amount-container'>
          <p className='total-amount'>{amount}</p>
      </div>
      </div>
      <div className="App">
        <Overlay isOpen={isOpen} cartItem={basket} onClose={toggleOverlay} />       
      </div>
    </nav>
  )
}

export default Header
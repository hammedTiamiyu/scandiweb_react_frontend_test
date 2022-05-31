import React, {useState, UseEffect, useEffect} from "react";
import {useStateValue} from '../StateProvider'
import {Link} from "react-router-dom"

function Product ({item}) { 
  console.log(item);
  const [category, setCategory] = useState('clothes');
  const [categoryList, setCategoryList] = useState([]);
  const [product, setProduct] =  useState([])
  const [productList, setProductList] = useState([]);
  const [priceCurrency, setPriceCurrency] = useState('USD')
  const [currencyList, setCurrencyList] = useState([]);
  const [{basket},dispatch] = useStateValue()
  // basket && console.log(item);
 // console.log(basket);

  // // adding items to the basket layers
  const addToBasket = ({id, name, gallery, prices}) =>{

    const priceCurrencyLabel = prices.filter((price) => price.currency.label === priceCurrency)
    priceCurrencyLabel && console.log(priceCurrencyLabel[0].amount)
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: name,
        image: gallery[0],           
        price: priceCurrencyLabel[0].amount,
        
      },
    })
  }


  useEffect(()=>{
    // setCategory(item[0].category);
    let myList =[];
    item.map(singleItem=>{
      if(myList.indexOf(singleItem.category)== -1){
        myList.push(singleItem.category);
      }

    })
    setCategoryList(myList);
    setCurrencyList(item[0].prices);
  },[])

  useEffect(()=>{
    // filtering products based on produccts
    setProductList(item.filter((items) => items.category === category ));
         
  },[category])

  // const filterCategory = (category) => {
  //   setCategory(category);    
  
  // }

 




  return(
    
     <div className="productContainer">
        {categoryList &&(
          
          categoryList.map((categoryItem, _index) =>{

            return(
              <button key={_index} onClick={() => setCategory(categoryItem)} >{categoryItem}</button>
            )

          })          
        
        )}
                 
         
      <select onChange={(e)=>setPriceCurrency(e.target.value)}>
         <option selected disabled>Select Currency</option>
         {currencyList &&(
             currencyList.map(currency =>(<option value={currency.currency.label}>{currency.currency.label}</option>))
           )}
     </select>               
 
         {/* category Name/Title */}
         <h1 className="categoryTitle">{category}</h1>

         {/* product list */}
       <div className="productList">
         {productList &&(
         productList.map((product) => {
        
         let priceFilter = []
         const {id, name, category, gallery, prices} = product;  

         // destructuring prices array
         priceFilter = prices.filter((price) => price.currency.label === priceCurrency)
         const priceCurrencyLabel = priceFilter[0].currency.label        
         const currencyAmount = priceFilter[0].amount
        
          return(
            <div className="product" key={id}>     
            <Link to={{
             pathname: `/product-details/${id}`,
             state: {item : {product : product,
              priceTag : {price: currencyAmount, label: priceCurrencyLabel}
            }}
           }} >        
              <div className="imgContainer">
                <img src={gallery[0]} alt={name} style={{height:'150', width:'150px'}} />
              </div>
             </Link>
               <div className="productInfo">
               <p>{name}</p>
                <h4> {priceCurrencyLabel + currencyAmount} </h4>                
               <button 
                className="addToBasket" 
                onClick={() => addToBasket({id, name, gallery,prices})}
               >
                 Add To Basket
               </button>             
               </div> 
           </div>          
          )
        })
        )}
       </div>
     
    </div>
  )
}
export default Product
import React, {useState, UseEffect, useEffect} from "react";
import {useStateValue} from '../StateProvider'
import {Link} from "react-router-dom"

function Product ({item}) { 

  const [{categories, setCategory}, dispatch] = useStateValue()
  const [productList, setProductList] = useState({})
  
  console.log(setCategory)

  useEffect(()=>{
    // filtering products based on produccts
    setProductList(item.filter((items) => items.category === setCategory ));         
  },[setCategory])  

  return(
    <div className="homeDiv" >
        <h4 style={{fontSize: '1.5em'}}>Start exploring our various amazing products today by clicking on any of the categories/collections above</h4>
       </div>
  )
}
export default Product
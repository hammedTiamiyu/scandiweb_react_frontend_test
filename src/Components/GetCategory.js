import React, {useState,  useEffect} from "react";
import {useStateValue} from '../StateProvider'



function GetCategory({item}) {
    const [{basket, categories,currencyLabel,loading},dispatch] = useStateValue()
    const [categoryList, setCategoryList] = useState([])
    const [currencyList, setCurrencyList] = useState([])
    
    console.log(item)   

    useEffect(() => {
      // const {prices} = item
      let category = []
      item.map((singleItem) => {
        if (category.indexOf(singleItem.category) == -1) {
            category.push(singleItem.category)
        }
      })
      
      category && setCategoryList(category) 

      categoryList && console.log(categoryList);      
      setCurrencyList(item[0].prices)
      console.log(currencyList)     
   
    },[categoryList.length < 1])

    // useEffect(() => {
    //   dispatch({
    //     type: "GET_TOTALS"
    //   })
    // },[basket])

    useEffect(() => {
      dispatch({
        type: "CATEGORY_LIST",
        item: categoryList
      })
      dispatch({
        type: "GET_PRODUCTS",
        item: item
      })

      dispatch({
        type: "CURRENCY_LIST",
        item: currencyList
      })
          
    },[categoryList.length < 1])
      
}

export default GetCategory
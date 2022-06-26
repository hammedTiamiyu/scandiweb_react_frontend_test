import React from 'react'
import "./ItemAttribute.css"

function ItemAttribute({attributes}) {
    console.log(attributes);
  return (
    <div className='attributeContanier'>
      {attributes.map((attribute)=> {
        const {id, name,type ,items} = attribute
        if(type === "swatch") {
          return (
            <div>
              <h4>{name}</h4>
              <div className='swatchAttributeContainer'>
              {items.map((item) => {
                const {id, value, displayValue} = item
                return(
                  <div  key={id}  className='swatchNameValueContainer'>
                    <button 
                    className='swatchButtons' 
                    value={value}
                    style={{backgroundColor:value, width:"30px", height:"30px", borderRadius:'50%'}}
                    />                    
                    <p>{displayValue}</p>
                  </div>
                )
              })}
            </div>
            </div>
          )
        }
        if (type === "text") {
          return (
            <div>
              <h4>{name}</h4>
              <div className='textAttributeContainer'>
              {items.map((item) => {
                const {id, value, displayValue} = item
                return(
                  
                  <div  key={id}  >
                    <button className='attributeButtons'                    
                    value={value}
                    style={{backgroundColor:value, width:"auto", height:"auto", padding:'7px', backgroundColor: '', border:'none'}}
                    >
                     { displayValue}
                    </button>                    
                  </div>
                )
              })}
            </div>
            </div>            
          )
        }
        // if (type)
      })}
      {/* atributes map ends */}
    </div>
  )
}

export default ItemAttribute
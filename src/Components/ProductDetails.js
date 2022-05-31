import React from 'react'
// import {ApolloProvider, use} from "@apollo/client"
import {Link, useParams, useLocation} from 'react-router-dom'

function ProductDetails() {
  
  const item = useLocation().state.item 
  console.log(item);
  const {id, name, category, gallery, prices} = item.product
  console.log(gallery.length);

  
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
            <div className='detailsImageBigContainer'>
              <img className='detailsImageBig' src={gallery[0]} alt={name}  />
            </div>
          </div>
          <div className='descriptions'>jjjjj
            {/* <div className='singleGalleryImage'></div> */}
          </div>          
        </div>
    )
}

export default ProductDetails
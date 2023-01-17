import React, {useState} from 'react'
import './Products.scss'

const ProductCard = (props) => {
    const {title , desc , price ,image ,setProductToCart ,product ,handleModal} = props;
    const restructureImage = (image)=>{
        return( image ? image.split(','):"")[0]
    }
  return (
      <div className="card">
          <img src={restructureImage(image)} alt="Product image" 
          onClick={e=>handleModal(product)}/>
              <h4 className="card-title">{title}</h4>
              <p className="price">Price: {price}KM</p>
              <p>{desc}</p>

        
              <p>
                <button className='button' 
                onClick={(e)=>{setProductToCart(product)}}
              >Add to Cart</button>
              </p>
      </div>
  )
}

export default ProductCard

import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import "./Cart.scss"

const Cart = () => {
  const [cartItems, setcartItems] = useState([])

 useEffect(() => {
   getProducts();
 
 }, [])
 
 const getProducts = ()=>{
  if(localStorage.getItem('products')){
    let products = localStorage.getItem('products');
    products = JSON.parse(products);
    setcartItems(products)
  }
 }

 const clearCart= ()=>{
   localStorage.removeItem('products');
   setcartItems([]);
   alert('Cart has been cleared');
 }
  const buyItems = () => {
    localStorage.removeItem('products');
    alert('Sucessfuly bought item/s');
    setcartItems([]);
  }

 console.log(cartItems);
  return (
    <div className='container mt-5'>
      <h3>Cart</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {cartItems && cartItems.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.price} KM</td>
                <td><img src={item.images} alt="image" /></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className='d-flex justify-content-center'>
        <Button variant="primary" type="submit" onClick={()=>{buyItems()}}  >
          Purchase
        </Button>
        <Button variant="warning" type="submit" className="ms-5" onClick={() => { clearCart() }}>
          Clear cart
        </Button>
      </div>
    </div>
  )
}

export default Cart
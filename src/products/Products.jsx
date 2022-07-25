import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductCard from './ProductCard';
import './Products.scss'
import { Tabs, Tab } from 'react-bootstrap';
import ProductModal from './ProductModal';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalProduct, setModalProduct] = useState({});

  const [categories, setCategories] = useState();

  const [modalShow, setModalShow] = useState(false);
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));


  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('loggedUser')));
  }, []);

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const setProductToCart = (product) => {
    if (!loggedUser) {
      return navigateToLogin();
    }

    let arr = [];
    if (localStorage.getItem('products')) {
      let old = localStorage.getItem(('products'));
      old = JSON.parse(old)
      old.push(product);
      localStorage.setItem('products', JSON.stringify(old));
      alert('Sucessfuly added to cart');
    } else {
      arr.push(product);
      localStorage.setItem('products', JSON.stringify(arr))
      alert('Sucessfuly added to cart');
    }
  }

  const handleClose = () => {
    setModalShow(false)
  }
  const handleShow = (product) => {
    setModalProduct(product);
    setModalShow(true);
  }

  useEffect(() => {

    getData();
    getCategories();


  }, []);

  const getData = () => {
    axios.get('http://localhost:3000/product/all')
      .then((response) => {
        setProducts(response.data);
        setLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  const getCategories = () => {
    axios.get('http://localhost:3000/category/all')
      .then((response) => {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  if (loaded)
    return (
      <div className=''>
        <div className='sm-2'>
          <Tabs
            defaultActiveKey="all"
            id="uncontrolled-tab-example"
            className="mb-3">

            <Tab eventKey="all" title="All Products">
              <h4 className='ms-5'>All Products</h4>
              <div className='products-layout container'>

                {products.map((product) => {
                  return (
                    <div
                      key={product.id}
                    >
                      <ProductCard className="product-card"
                        title={product.title}
                        description={product.prod_desc}
                        price={product.price}
                        image={product.images}
                        setProductToCart={setProductToCart}
                        product={product}
                        handleModal={handleShow}
                      ></ProductCard>
                    </div>
                  )
                })}
              </div>
            </Tab>
            {categories && categories.map((category) => {
              return (
                <Tab
                  key={category.id}
                  eventKey={category.title}
                  title={category.title}
                >
                  <h4 className='ms-5'>{category.title}</h4>
                  <div className='products-layout container'>

                    {
                      products.map((product) => {
                        if (product.category_id === category.id) {
                          return (
                            <div
                              key={product.id}
                            >
                              <ProductCard className="product-card"
                                key={product.id}
                                title={product.title}
                                description={product.prod_desc}
                                price={product.price}
                                image={product.images}
                                setProductToCart={setProductToCart}
                                product={product}
                                handleModal={handleShow}
                              ></ProductCard>
                            </div>)
                        }


                      })}
                  </div>
                </Tab>
              )
            })}
          </Tabs>
        </div>
        <ProductModal
          handleClose={handleClose}
          show={modalShow}
          product={modalProduct}
        ></ProductModal>
      </div>)
}

export default Products
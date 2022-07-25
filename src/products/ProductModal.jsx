import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';

const ProductModal = ({ handleClose, show, product }) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);

    };
    const restrutureImage = (image) => {
        let images = []
        if (image) {
            images = image.split(',')
        } else {
            images = []
        }
        return images
    }
    return (
        <div>
            <Modal
                size="lg"
                show={show}
                onHide={() => handleClose()}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Title : {product.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
                        {
                            restrutureImage(product.images).map((image, i) => {
                                return <Carousel.Item key={i} >
                                    <img
                                        className="d-block w-100"
                                        src={image}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            })
                        }
                    </Carousel>
                    <div className='mt-5'>
                        <h4>Price: {product.price} KM</h4>
                    </div>
                    <div>
                        <h4>Description:</h4>
                        <p>{product.prod_desc}</p>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ProductModal
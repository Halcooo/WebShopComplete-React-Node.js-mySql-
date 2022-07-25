import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const ProductForm = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [categories, setCategories] = useState();
    const [loaded, setLoaded] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('http://localhost:3000/category/all')
            .then((response) => {
                setCategories(response.data);
                setLoaded(true);
                console.log(categories);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const product = {
        title,
        price,
        desc,
        categoryId,
    }

    const saveProduct = (e) => {
        axios.post('http://localhost:3000/product/save',
            product
        )
            .then(function (response) {
                console.log(response.data)
                setShow(true);
            })
            .catch(function (error) {
                console.log(error);
                setShow(true);
            });
        
    }

    return (
        <div className='container mt-5'>
            <div className="form-wrapper">
                <h3>Add product</h3>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Description" onChange={e => setDesc(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="number" placeholder="Price" onChange={e => setPrice(e.target.value)} />
                    </Form.Group>

                    <Form.Label>Select category</Form.Label>
                    <Form.Select aria-label="Default select example" value={categoryId} onChange={e => { setCategoryId(e.target.value) }}>
                        <option >Please select a category</option>
                        {categories ? categories.map((category) => {
                            return <option key={category.id} value={category.id} >{category.title}</option>
                        }) : ""}
                    </Form.Select>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={saveProduct} >
                        Save product
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ProductForm
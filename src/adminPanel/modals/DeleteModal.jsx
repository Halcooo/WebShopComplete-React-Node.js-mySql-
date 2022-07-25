import axios from 'axios';
import React from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const DeleteModal = ({ handleClose, title, show, id, refreshData, deleteProduct }) => {


    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete product : {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete tihs?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => deleteProduct(id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal></div>
    )
}

export default DeleteModal
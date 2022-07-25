
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ProductImageModal = ({handleClose,saveImage,saveImageApi,title, show}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add image to: { title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Image link</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => saveImage(e)}
              required="required"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={saveImageApi}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductImageModal;

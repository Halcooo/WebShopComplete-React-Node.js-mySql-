import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import ProductImageModal from "./modals/ProductImageModal";
import DeleteModal from "./modals/DeleteModal";

const ProductTable = () => {
  //data
  const [products, setProducts] = useState([{ id: 1 }]);

  // product passed to modal=> 
  const [productModal, setProductModal] = useState({});

  //image modal
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageToSave, setImageToSave] = useState();

  //delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // handlers for Image Modal
  const handleShowImage = (product) => {
    setShowImageModal(true);
    setProductModal(product);
  };
  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setProductModal({});
  };

  //handlers for Delete Modal

  const handleShowDelete = (product) => {
    setShowDeleteModal(true);
    setProductModal(product);
  }
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductModal({});
  };

  useEffect(() => {
    getData();
  }, []);

  const saveImageApi = () => {
    axios
      .post("http://localhost:3000/product-image/save", {
        productId: productModal.id,
        image: imageToSave,
      })
      .then(function (response) {
        setShowImageModal(false);
        getData();
      })
      .catch(function (error) {
        console.log(error);

        alert("Todo....... image not saved");
      });

  };
  const deleteProduct = (productId) => {
    axios
      .delete("http://localhost:3000/delete-product/" + productId, {
      })
      .then(function (response) {
        handleCloseDeleteModal();
        getData();

      })
      .catch(function (error) {
        console.log(error);

      });

  };



  const getData = async () => {
    const data = await axios.get("http://localhost:3000/product/all");
    setProducts(data.data.map(product => {
      if (product.images) {
        product = { ...product, images: product.images.split(",") }
      } else { product = { ...product, images: [] }; }
      return product
    }));

  };



  return (
    <div className=' mt-5'>
      <h3>Products</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Images</th>
            <th>Delete / Add Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.prod_desc}</td>
                <td>
                  {product.images ? product.images.map((img, index) => {
                    return <img key={index} src={img} alt="img"></img>
                  }) : ""}
                </td>
                <td className="icon-td">
                  <div className="delete-icon"
                    onClick={() => handleShowDelete(product)}>
                    <FaTrash />
                  </div>
                  <div
                    className="edit-icon"
                    onClick={() => handleShowImage(product)}
                  >
                    <FaImage />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ProductImageModal
        title={productModal.title}
        show={showImageModal}
        handleClose={handleCloseImageModal}
        saveImage={(e) => setImageToSave(e.target.value)}
        saveImageApi={saveImageApi}
      />
      <DeleteModal
        title={productModal.title}
        handleClose={handleCloseDeleteModal}
        show={showDeleteModal}
        id={productModal.id}
        deleteProduct={deleteProduct}
      ></DeleteModal>
    </div>
  );
};

export default ProductTable;

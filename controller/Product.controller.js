const connection = require('../database/connection')
const { getProducts , save ,saveImage ,getProductImages ,deleteRepos} = require('../repository/Product.repository')



const getAllProducts = async (req, res) => {
  try {
    const response = await getProducts();    
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
const getAllProductImages = async (req, res) => {
  try {
    const productId = req.params;
    const response = await getProductImages(productId);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
const saveProduct = async (req, res) => {
  try {
    const product = req.body
    const response = await save(product);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
const saveProductImage = async (req, res) => {
  try {
    const product = req.body;
    const response = await saveImage(product);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const id = req.params
    console.log(id);
    const response = await deleteRepos(id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};



module.exports = {
    getAllProducts,
    saveProduct,
    saveProductImage,
    getAllProductImages,
    deleteProduct,
}
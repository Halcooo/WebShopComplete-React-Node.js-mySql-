const connection = require("../database/connection");
const { getCategory ,save ,deleteRepos} = require("../repository/Category.repository");

const getAllCategories = async (req, res) => {
  try {
    const response = await getCategory();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
const saveCategory = async (req, res) => {
  try {
    const title = req.body
    const response = await save(title);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
const deleteCategory = async (req, res) => {
  try {
    const id = req.params;
    const response = await deleteRepos(id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = {
  getAllCategories,
  saveCategory,
  deleteCategory,
};

const { register, login ,getUsers ,update } = require('../repository/User.repository')
const connection = require('../database/connection')

const registerUser = async (req,res) => {

    try {
        const user = req.body;
        const response = await register(user);
        res.status(200).json(response)
        
    }catch(err) {
        res.status(500).send(err);
    }
}
const loginUser = async(req,res) => {

    try {
        const user = req.body;
        const response = await login(user);
        res.status(200).json(response)
        
    }catch(err) {
        res.status(500).send(err);
    }
}
const getAllUsers = async (req, res) => {
  try {
    const response = await getUsers();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
const updateProfile = async (req, res) => {
  try {
    const user = req.body;
    const response = await update(user);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    updateProfile,
}
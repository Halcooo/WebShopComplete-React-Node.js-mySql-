const connection = require("../database/connection");

const getCategory = () => {
  return new Promise(async (resolve, reject) => {
    const querry = `SELECT * from category`;

    connection.query(querry, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const save = (category) => {
  return new Promise(async (resolve, reject) => {
    const querry = `INSERT into category (title) value (?)`;

    connection.query(querry, [category.category], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const deleteRepos = (id) => {
  return new Promise(async (resolve, reject) => {
    const querry = `DELETE from category where id= ?`;
    connection.query(querry, [id.id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getCategory,
  save,
  deleteRepos,
};

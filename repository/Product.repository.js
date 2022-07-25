const connection = require("../database/connection");

const getProductImages = (id) => {
  return new Promise(async (resolve, reject) => {
    const querry = `SELECT * from product_image where product_id = ?`;

    connection.query(querry, [id], (err, images) => {
      if (err) return reject(err);
      let response = images ? images.map((p) => p.image) : [];
      resolve(response);
    });
  });
};

const getProducts = () => {
  return new Promise(async (resolve, reject) => {
    const querry = `select p.id , p.title,p.price,p.prod_desc,p.category_id,
                    group_concat(i.image order by i.image) as images
                    from product p
                    left join product_image i on p.id = i.product_id
                    group by p.id`;
    connection.query(querry, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const saveImage = (product) => {
  const { productId, image } = product;
  return new Promise(async (resolve, reject) => {
    const querry = `INSERT into product_image (product_id , image) values (?,?)`;

    connection.query(querry, [productId, image], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const save = (product) => {
  const { title, desc, price, categoryId } = product;
  return new Promise(async (resolve, reject) => {
    const querry = `INSERT into product (id,title,prod_desc,price,category_id) values (null,?,?,?,?)`;

    connection.query(
      querry,
      [title, desc, price, categoryId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};
const deleteRepos = (id) => {
  return new Promise(async (resolve, reject) => {
    const querry = `DELETE from product where id= ?`;
    connection.query(querry, [id.id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getProducts,
  save,
  saveImage,
  getProductImages,
  deleteRepos,
};

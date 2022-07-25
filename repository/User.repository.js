const connection = require("../database/connection");
const USER_ROLE = "USER_ROLE";
const ADMIN_ROLE = "ADMIN_ROLE";

const register = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await saveUser(user);
      await saveProfile(user, id);
      resolve("Profile sucessfuly created");
    } catch (error) {
      reject(error);
    }
  });
};

const login = (user) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = user;
    const querryUser = `SELECT user.username,user.id,user.email,user.role, 
    profile.first_name,profile.last_name,profile.address,profile.image FROM user , profile where email = ? and password = ? and user.id = profile.id`;

    connection.query(querryUser, [email, password], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};

const saveUser = (user) => {
  const { username, email, password } = user;
  const querryUser = `INSERT INTO user (username,email,password,role)
        VALUES (?,?,?,?)`;
  return new Promise((resolve, reject) => {
    connection.query(
      querryUser,
      [username, email, password, USER_ROLE],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
};

const saveProfile = (user, id) => {
  const { firstName, lastName, address } = user;
  const querryUser = `INSERT INTO profile (id,first_name,last_name,address)
        VALUES (?,?,?,?)`;
  return new Promise((resolve, reject) => {
    connection.query(
      querryUser,
      [id, firstName, lastName, address],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};
const update = (user) => {
  const { firstName, lastName, address ,image ,phone ,id } = user;
  console.log(user);
  const querryUser = `UPDATE profile 
  SET first_name = '${firstName}', last_name = '${lastName}' ,address = '${address}' ,image = '${image}',phone = '${phone}'  
  WHERE id = ${id}`;
  return new Promise((resolve, reject) => {
    connection.query(
      querryUser,
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};
const getUsers = () => {
  return new Promise( (resolve, reject) => {
    const querry = "SELECT * from user LEFT JOIN profile on user.id=profile.id";
    connection.query(querry, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  register,
  login,
  getUsers,
  update
};

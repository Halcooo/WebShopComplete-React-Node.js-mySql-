const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "rapid_comp",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Sucessfuly connected to database!!!!!!!!!!");
});

module.exports = conn;
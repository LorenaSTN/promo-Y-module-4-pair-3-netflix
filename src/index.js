const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
require("dotenv").config();

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "netflix",
  });
  connection.connect();
  return connection;
}

// init express aplication
const serverPort = process.env.PORT;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get("/movies", async (req, res) => {
  const connection = await getDBConnection();
  const genreFilterParam = req.query.genre;

  let data;
  if (!genreFilterParam) {
    const sqlQuery = "SELECT * FROM movies";
    const [result] = await connection.query(sqlQuery);
    data = result;
  } else {
    const sqlQuery = "SELECT * FROM movies WHERE genre = ?";
    const [result] = await connection.query(sqlQuery, [genreFilterParam]);
    data = result;
  }
  res.json({ success: true, movies: data });

  connection.end();
});

const staticServer = "./src/public-react";
server.use(express.static(staticServer));

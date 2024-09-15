const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
require("dotenv").config();

server.set("view engine", "ejs");

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
    const sqlQuery = "SELECT * FROM movies WHERE gender = ?";
    const [result] = await connection.query(sqlQuery, [genreFilterParam]);
    data = result;
  }
  res.json({ success: true, movies: data });

  connection.end();
});

server.get("/movies/:movieId", async (req, res) => {
  const connection = await getDBConnection();
  const id = req.params.movieId;
  // console.log("id:", id);

  const query = "SELECT * FROM movies WHERE idMovies = ?";
  const [result] = await connection.query(query, [id]);

  connection.end();

  res.render("detail", { movie: result[0] });
});

server.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const connection = await getDBConnection();

  const passwordHarshed = await bcrypt.hash(password, 10);

  const query = "INSERT INTO users (email, password) VALUES (?,?)";

  const [newUserResult] = await connection.query(query, [
    email,
    passwordHarshed,
  ]);

  connection.end();

  res.status(201).json({
    success: true,
    message: newUserResult.id,
  });
});

const staticServer = "./src/public-react";
server.use(express.static(staticServer));

// const staticServerDetail = "...";
// server.use(express.static(staticServerDetail));

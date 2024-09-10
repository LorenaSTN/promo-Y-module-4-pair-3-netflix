const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "LorenayToby1",
    database: "netflix",
  });
  connection.connect();
  return connection;
}

// init express aplication
const serverPort = 5001;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get("/movies", async (req, res) => {
  try {
    const connection = await getDBConnection();
    const sqlQuery = "SELECT * FROM netflix.movies";
    const [result] = await connection.query(sqlQuery);

    connection.end();
    res.json({
      status: "success",
      message: result,
    });
  } catch (error) {
    console.error("Error getting movies:", error);
    res.status(500).json({
      status: "error",
      message: "Error getting movies",
    });
  }
});

// const staticServer = "./web";
// server.use(express.static(staticServer));

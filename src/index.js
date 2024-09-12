const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

const serverPort = 5001;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "route",
    password: "123456",
    database: "netflix",
  });
  connection.connect();
  return connection;
}

server.get("/movies", async (req, res) => {
  const connection = await getDBConnection();
  const sqlQuery = "SELECT * FROM movies";
  const [result] = await connection.query(sqlQuery);
  connection.end();
  res.json({
    status: "succes",
    message: result
  });
});




/*
const fakeMovies = [
  {
    id: 1,
    title: "Wonder Woman",
    genre: "Action",
    image:
      "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/12/gal-gadot-como-wonder-woman-universo-extendido-dc-2895594.jpg?tf=3840x",
    category: "Superhero",
    year: 2017,
    director: "Patty Jenkins",
  },
  {
    id: 2,
    title: "Inception",
    genre: "Science Fiction",
    image:
      "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg",
    category: "Thriller",
    year: 2010,
    director: "Christopher Nolan",
  },
];
*/

// init express aplication

/*
server.get("/movies", function (req, res) {
  res.json(fakeMovies);
});
*/

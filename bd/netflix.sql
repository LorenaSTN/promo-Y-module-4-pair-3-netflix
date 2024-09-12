CREATE DATABASE netflix;
USE netflix;

CREATE TABLE `actors` (
  `idActor` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`idActor`)
);

CREATE TABLE `movies` (
  `idMovies` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `category` varchar(45) NOT NULL,
  `year` int DEFAULT NULL,
  PRIMARY KEY (`idMovies`)
);

CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `users` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `plan_details` varchar(45) NOT NULL,
  PRIMARY KEY (`idUser`)
);

INSERT INTO movies (title, gender, image, category, year)
VALUE ('Pulp Fiction', 'Crimen', 'https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg', 'Top 10', 1994),
('La vita è bella', 'Comedia', 'https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg', 'Top 10', 1996),
('Forrest Gump', 'Comedia', 'https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg', 'Top 10', 1994);

INSERT INTO users (users, password, name, email, plan_details)
VALUE ('laura_dev', 'laura', 'Laura', 'laura@gmail.com', 'Standard' ),
('maria_dev', 'maria', 'Maria', 'maria@gmail.com', 'Standard' ),
('ester_dev', 'ester', 'Ester', 'ester@gmail.com', 'Standard' );

INSERT INTO actors (name, lastname, country, birthday)
VALUE ('Tom', 'Hanks', 'Estados Unidos', '1956-07-09' ),
('Roberto', 'Benigni', ' Italia', '1952-10-27' ),
('John', 'Travolsta', 'Estados Unidos', '1954-02-18' );

SELECT *
FROM movies;

SELECT title, gender
FROM movies
WHERE year > 1990;

SELECT *
FROM movies
WHERE category = "Top 10";

UPDATE movies
SET year= 1997 
WHERE idMovies = 2;

SELECT *
FROM actors;

SELECT *
FROM actors
WHERE birthday BETWEEN '1950-01-01' AND '1960-12-31';

SELECT name, lastName
FROM actors
WHERE country = 'Estados Unidos';

SELECT *
FROM users
WHERE plan_details = 'Standard';

SET SQL_SAFE_UPDATES = 0;
DELETE FROM users WHERE name LIKE 'M%';

ALTER TABLE actors ADD image VARCHAR(1000);

CREATE TABLE users_and_movies(
fk_users INT, fk_movies INT,
FOREIGN KEY (fk_users) REFERENCES users(idUser),
FOREIGN KEY (users_and_moviesfk_movies) REFERENCES movies (idMovies)
);

INSERT INTO users_and_movies (fk_users, fk_movies)
VALUES
(1, 1),
(3, 2);

ALTER TABLE  users_and_movies ADD score INT;

CREATE TABLE movies_and_actors(
fk_movies INT, fk_actors INT,
FOREIGN KEY (fk_movies) REFERENCES movies (idMovies),
FOREIGN KEY (fk_actors) REFERENCES actors (idActor)
);

INSERT INTO movies_and_actors( fk_movies, fk_actors)
VALUES(1, 3),
(3, 1),
(2, 2);



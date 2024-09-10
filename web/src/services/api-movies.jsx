// login

async function getMoviesFromApi() {
  console.log("Se están pidiendo las películas de la app");

  const response = await fetch("http://localhost:5001/movies");
  const dataMovies = await response.json();
  console.log(dataMovies);
}
getMoviesFromApi();

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;

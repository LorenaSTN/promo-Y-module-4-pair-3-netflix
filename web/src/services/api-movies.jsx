// login

const getMoviesFromApi = (params) => {
  return fetch(`http://localhost:5001/movies?genre=${params.genre}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;

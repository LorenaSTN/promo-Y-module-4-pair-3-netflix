// login

async function getMoviesFromApi() {
  console.log("Se están pidiendo las películas de la app");

  const response = await fetch("http://localhost:5001/movies");
  const dataMovies = await response.json();
  console.log(dataMovies);

  /*
  return (
    fetch("http://localhost:5001/movies")
      // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC

      .then((response) => response.json())
      .then((data) => {
        return data;
      })
  );
  */
}

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;

// .then((response) => response.json())
// .then(() => {
//   // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
//   return {
//     success: true,
//     movies: [
//       {
//         id: "1",
//         title: "Gambita de dama",
//         genre: "Drama",
//         image:
//           "//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/gambito-de-dama.jpg",
//       },
//       {
//         id: "2",
//         title: "Friends",
//         genre: "Comedia",
//         image:
//           "//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/friends.jpg",
//       },
//     ],

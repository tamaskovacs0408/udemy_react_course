import { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const handleFetch = () => {
    fetch("https://swapi.dev/api/films")
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  };

  return (
    <>
      <section>
        <button onClick={handleFetch}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </>
  );
}

export default App;

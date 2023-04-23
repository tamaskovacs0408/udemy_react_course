import { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    setIsLoading(prevState => !prevState);
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    setMovies(data.results);
    setIsLoading((prevState) => !prevState);
  };

  return (
    <>
      <section>
        <button onClick={handleFetch}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? (
          <div className="icon">
            <img
              src="https://img.icons8.com/color/48/null/tie-fighter.png"
              alt="tie fighter icon"
            />
          </div>
        ) : (
          <MoviesList movies={movies} />
        )}
      </section>
    </>
  );
}

export default App;

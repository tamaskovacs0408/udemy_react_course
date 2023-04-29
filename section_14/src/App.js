import { useState, useRef, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import SwLogo from "./assets/sw.png";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const movieRef = useRef(null);

  const handleFetch = useCallback(async () => {
    setIsLoading((prevState) => !prevState);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading((prevState) => !prevState);
  }, []) ;

  const scrollCallBack = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  const options = {
    root: null,
    rootMargin: "0px",
    treshold: 0.3,
  };

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  useEffect(() => {
    const observer = new IntersectionObserver(scrollCallBack, options);
    if (movieRef.current) observer.observe(movieRef.current);

    return () => {
      if (movieRef.current) observer.unobserve(movieRef.current);
    }
  }, [movieRef, options]);

  return (
    <>
      <section>
        <img src={SwLogo} alt="Star Wars logo" />
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
          <MoviesList movies={movies} movieRef={movieRef} visible={isVisible} />
        )}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </>
  );
}

export default App;

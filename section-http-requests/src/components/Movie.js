import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  let releaseDate = props.releaseDate.replace(/-/g, ".");

  releaseDate = releaseDate.concat(".");

  return (
    <li ref={props.movieRef} className={props.visible ? `${classes.movie} ${classes.hidden} ${classes.visible}` : `${classes.movie} ${classes.hidden}`}>
      <h2>{props.title}</h2>
      <h3>{releaseDate}</h3>
      <p>{props.openingText}</p>
    </li>
  );
};

export default Movie;

import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  let releaseDate = props.releaseDate.replace(/-/g, ".");

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{releaseDate}</h3>
      <p>{props.openingText}</p>
    </li>
  );
};

export default Movie;

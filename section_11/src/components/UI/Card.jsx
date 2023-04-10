import classes from "./Card.module.css";

import React from 'react'

const Card = ({children}) => {
  return (
    <div className={classes.card}>{children}</div>
  )
}

export default Card
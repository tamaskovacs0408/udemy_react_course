import classes from "./Header.module.scss";
import burgerImg from "../../assets/burgers.jpg";
import HeaderCart from "./HeaderCart";

import React from 'react'

const Header = ({showCart}) => {
  return (
    <>
    <header className={classes.header}>
      <h1>BurgerToDeliver</h1>
      <HeaderCart showCart={showCart} />
    </header>
    <div className={classes['main-image']}>
      <img src={burgerImg} alt="Ingredients on table"/>
    </div>
    </>
  )
}

export default Header
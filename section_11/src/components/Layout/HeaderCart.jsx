import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCart.module.css";

const HeaderCart = ({showCart}) => {
  const cartCtx = useContext(CartContext);

  const numOfCartItems = cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>
        Your cart
      </span>
      <span className={classes.badge}>
        {numOfCartItems}
      </span>
    </button>
  );
};

export default HeaderCart;

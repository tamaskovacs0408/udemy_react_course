import { useContext } from "react";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = ({ closeCart }) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {};

  const cartItemAddHandler = (item) => {};

  return (
    <Modal closeCart={closeCart}>
      <div className={classes["cart-items"]}>
        <ul>
          {cartCtx.items.map((item) => {
            return (
              <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
              />
            );
          })}
        </ul>
      </div>
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={closeCart}>
          Close
        </button>
        {hasItems ? <button className={classes.button}>Order</button> : null}
      </div>
    </Modal>
  );
};

export default Cart;

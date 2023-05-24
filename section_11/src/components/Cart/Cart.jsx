import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.scss";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = ({ closeCart }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    const cartItem = { ...item, amount: 1 };
    cartCtx.addItem(cartItem);
  };

  const handleOrder = () => {
    setIsCheckout(true);
  };

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
      {isCheckout && <Checkout closeCart={closeCart}/>}
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={closeCart}>
            Close
          </button>
          {hasItems ? (
            <button className={classes.button} onClick={handleOrder}>
              Order
            </button>
          ) : null}
        </div>
      )}
    </Modal>
  );
};

export default Cart;

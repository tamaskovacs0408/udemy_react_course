import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = ({id, name, image, description, price}) => {
  const burgerPrice = `$${price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);

  const handleAddToCart = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        {/* <div>
          <img src={image} alt={name} />
        </div> */}
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{burgerPrice}</div>
      </div>
      <div>
        <MealItemForm id={id} addToCart={handleAddToCart}/>
      </div>
    </li>
  );
}

export default MealItem
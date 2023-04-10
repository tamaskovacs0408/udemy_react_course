import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { DUMMY_MEALS } from "../../data/dumBurgers";
import classes from "./AvailableMeals.module.css";

function AvailableMeals() {
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {DUMMY_MEALS.map((burger) => {
            return (
              <MealItem key={burger.id}
                id={burger.id}
                name={burger.name}
                image={burger.image}
                description={burger.description}
                price={burger.price}
              />
            );
          })}
        </ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;

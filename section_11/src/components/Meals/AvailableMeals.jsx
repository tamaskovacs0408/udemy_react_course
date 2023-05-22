import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

function AvailableMeals() {
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBurgers = async () => {
      const response = await fetch(
        "https://burgersdata-default-rtdb.europe-west1.firebasedatabase.app/burgers.json"
      );
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          image: responseData[key].image,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setBurgers(loadedMeals);
      setLoading(false);
    };

    fetchBurgers();
  }, []);

  if (loading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {burgers.map((burger) => {
            return (
              <MealItem
                key={burger.id}
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

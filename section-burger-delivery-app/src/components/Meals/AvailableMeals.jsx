import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.scss";

function AvailableMeals() {
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchBurgers = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URL}/burgers.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

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

    fetchBurgers().catch((error) => {
      setLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (loading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return <section className={classes.mealsError}>{httpError}</section>;
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

import React from "react";
import useFetch from "../../hooks/use-fetch";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const url =
    "https://react-movie-84a0e-default-rtdb.europe-west1.firebasedatabase.app/meals.json";
  const { data, isLoading, error } = useFetch(url);

  let content = "";
  let loadedMeals = [];

  if (error) {
    content = <p>Found no Meals, an error has occured.</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    // console.log("data:", data);
    for (const keyData in data) {
      loadedMeals.push({
        id: keyData,
        name: data[keyData].name,
        description: data[keyData].description,
        price: data[keyData].price,
      });
    }
    // console.log("isLoading", isLoading);
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {content}
          {loadedMeals.map((meal) => (
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

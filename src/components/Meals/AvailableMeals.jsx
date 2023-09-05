import { Fragment, useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import banh_dap from "../../assets/banh_dap.jpg";
import banh_mi from "../../assets/banh_mi.jpg";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  //func passed inside useEffect should not return a promise

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://banh-e37bd-default-rtdb.firebaseio.com/meals.json"
      );

      const responseData = await response.json();
      if (responseData === null) {
        throw new Error("Something went wrong!");
      }
      const loadedMeals = [];
      // setTimeout(() => {
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
      // }, 5000);
    };
    //fetchMeals() return a promise, either can add ,.then() or .catch() to handle error)
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  const loadingSection = (
    <section>
      <div className={classes["loading-animation"]}>
        <span className={classes["first-ball"]}></span>
        <span className={classes["second-ball"]}></span>
        <span className={classes["third-ball"]}></span>
      </div>
    </section>
  );

  // if (httpError) {
  //   return (
  //     <section className={classes["meal-error"]}>
  //       <p>{httpError}</p>
  //     </section>
  //   );
  // }
  let mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    >
      {meal.name}
    </MealItem>
  ));

  return (
    <section className={classes.meals}>
      {mealList.length > 0 && (
        <Card>
          <ul>{mealList}</ul>
        </Card>
      )}
      {!isLoading && mealList.length === 0 && (
        <p className={classes["meal-error"]}>{httpError}</p>
      )}
      <div>{isLoading && loadingSection}</div>
    </section>
  );
};
export default AvailableMeals;

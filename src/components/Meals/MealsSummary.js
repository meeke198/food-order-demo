import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Vietnamese Banh Shop House</h2>
      <p>
       Celebrate Vietnamese culture through foods!
      </p>
      {/* <p>
        All our meals are cooked with fresh high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p> */}
    </section>
  );
};
export default MealsSummary;
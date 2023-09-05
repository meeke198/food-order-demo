
import { useRef, useState } from "react"
import Input from "../UI/Input"
import classes from "./MealItemForm.module.css"
const MealItemForm = (props) => {
    const [isValidAmount, setIsValidAmount] = useState(true)
    const amountInputRef = useRef();
    const submitHandler = (e) => {
      e.preventDefault();
      const enteredAmount = amountInputRef.current.value;
      //  amountInputRef.current.value; is ALWAYS A STRING
      const enteredAmountNumber = +enteredAmount;
      //   +enteredAmount => convert string number to number
      console.log({ enteredAmount });
      console.log({ enteredAmountNumber });
      


      if(enteredAmountNumber === 0 || enteredAmountNumber < 1 || enteredAmountNumber >  5){
        setIsValidAmount(false);
        return;
      }
      props.onAddToCart(enteredAmountNumber)
    }
    return (
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
        ref={amountInputRef}
          label="Amount"
          input={{
            id: "amount_" + props.id,
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
        <button>Add</button>
        {!isValidAmount && <p>Please enter a valid amount</p>}
      </form>
    );

}
export default MealItemForm;
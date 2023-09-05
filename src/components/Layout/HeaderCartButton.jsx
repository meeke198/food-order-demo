import {useContext, useEffect, useState} from 'react'
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from '../../store/CartContext';
const HeaderCartButton = (props) => {
  const cartCtx =  useContext(CartContext);
  const [isHighlighted, setIsHighlighted] = useState(false)
  const {items} = cartCtx;
  const cartItemsTotal = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
    }, 0);
    const btnClasses = `${classes.badge} ${isHighlighted ? classes.bump : ""}`;
useEffect(() => {
  if(cartCtx.items.length === 0){
    return
  }
  setIsHighlighted(true)
 const timerId = setTimeout(() => {
  setIsHighlighted(false)
 }, 300)
 return () => {
  clearTimeout(timerId);
 }
},[items]);
return (
  <button className={classes.button} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your cart</span>
    <span className={btnClasses}>{cartItemsTotal}</span>
  </button>
);

}
export default HeaderCartButton;
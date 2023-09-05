import classes from "./Cart.module.css";
import { useContext, useState, Fragment } from "react";
import CartItem from "./CartItem";
import CartContext from "../../store/CartContext";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false)
  const totalAmount = `$${cartCtx.totalAmount?.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addCartItemHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          sumary={item.sumary}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={addCartItemHandler.bind(null, item)}
        />
      ))}
    </ul>
    //   The first argument to .bind() is null, meaning that the context for the
    //    new function will not be changed. The second argument passed to .bind()
    //    is item, which will be used as the first argument
    //    for the addCartItemHandler function when the new function is invoked.
    //    This way, you can pass the item object as an argument to the addCartItemHandler
    //    function when the corresponding event occurs.
  );

  const orderHandler = () => {
    setIsCheckout(true)

  }
  const submitOrderHandler = async (userData) => {
    fetch(
      "https://banh-e37bd-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          cartItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && cartActions}
    </Fragment>
  );
   const isSubmittingModalContent = <p>Sending order data...</p>;

   const didSubmitModalContent = (
     <Fragment>
       <p style={{textAlign: 'center', fontSize: '2rem'}}>Successfully sent the order!</p>
       <div className={classes.actions}>
         <button className={classes.button} onClick={props.onClose}>
           Close
         </button>
       </div>
     </Fragment>
   );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;

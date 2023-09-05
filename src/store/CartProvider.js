
import { useReducer } from "react";
import CartContext from "./CartContext"
const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) =>{
    if (action.type === 'ADD_CART_ITEM') {
        const updatedTotalAmount = state.totalAmount + action.data.price * action.data.amount
        let existingCartItemIndex = state.items.findIndex(item => item.id === action.data.id)
        let existingCartItem = state.items[existingCartItemIndex]
        let updatedItems;
        if(existingCartItem){
            let updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.data.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.data);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'DELETE_CART_ITEM') {
       let existingCartItemIndex = state.items.findIndex(
         (item) => item.id === action.id
       );
      let existingCartItem = state.items[existingCartItemIndex];
      let updatedTotalAmount = state.totalAmount - existingCartItem?.price;
      let updatedItems;
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter(
          (item) => item.id !== action.id
        );
      } else {
        let updatedCartItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedItems = state.items;
        updatedItems[existingCartItemIndex] = updatedCartItem;
      }
       return {
         items: updatedItems,
         totalAmount: updatedTotalAmount,
       };
       
    } 
      if (action.type === "CLEAR") {
        return defaultCartState;
      }

    return defaultCartState;
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD_CART_ITEM',
            data: item,
        })

    }
    const removeItemToCartHandler = (id) => {
        dispatchCartAction({
            type: 'DELETE_CART_ITEM',
            id: id
        })
    };

      const clearCartHandler = () => {
        dispatchCartAction({ type: "CLEAR" });
      };
    const cartContext = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler,
      removeItem: removeItemToCartHandler,
      clearCart: clearCartHandler
    };
return (<CartContext.Provider value={cartContext}>
    {/* {console.log(props.children)} */}
    {props.children}
</CartContext.Provider>
)}
export default CartProvider;
// This is the Provider component of the CartContext. The Provider component is a part of React's Context API and is used to provide data 
// to all the components that are descendants of it. It receives a special prop called value, which allows passing the data (or state)
//  to the components that consume this context.
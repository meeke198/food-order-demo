import {createContext} from "react";
import Cart from "../components/Cart/Cart";

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
     clearCart: () => {}
})

export default CartContext;
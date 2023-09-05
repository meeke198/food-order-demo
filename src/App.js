import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [isShownCart, setIsShownCart] = useState(false);
  const showCartHandler = () => {
    setIsShownCart(true);
  };

  const hideCartHandler = () => {
    setIsShownCart(false);
  };
  return (
    <CartProvider>
      {isShownCart && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

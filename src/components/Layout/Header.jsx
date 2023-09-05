import { Fragment } from "react";
import classes from "./Header.module.css";
import Carousel from "./Carousel";
import mealsImage from "../../assets/banh_mi.jpg";
import logo from "../../assets/banh_logo.png";

import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>
          <img
            style={{ height: "80px", width: "120px", padding: "20% 20%" }}
            src={logo}
            alt="Banh logo"
          />
        </h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        {/* <img src={mealsImage} alt="Yummy Vietnamese smash rice cake" /> */}
        <Carousel />
      </div>
    </Fragment>
  );
};
export default Header;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import mealsImage from "../../assets/meals.jpg";
import { authActions } from "../../store/auth-slice";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import LOGO from "../../assets/logo.png";

const Header = (props) => {
  const dispatch = useDispatch();
  const authIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLogged, setIsLogged] = useState(authIsLoggedIn);
  // const authToken = useSelector((state) => state.auth.token);
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    if (authToken) {
      setIsLogged(true);
      dispatch(
        authActions.updateReduxState({
          token: authToken,
          isLoggedIn: true,
        })
      );
    } else {
      setIsLogged(false);
      dispatch(
        authActions.updateReduxState({
          token: authToken,
          isLoggedIn: false,
        })
      );
    }
  }, [authToken, dispatch]);

  return (
    <>
      <header className={classes.header}>
        <Link to="/meals">
          <img src={LOGO} alt="Logo" />
        </Link>
        {isLogged && <HeaderCartButton onClick={props.onShowCart} />}
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Table full of Delicious Meals" />
      </div>
    </>
  );
};

export default Header;

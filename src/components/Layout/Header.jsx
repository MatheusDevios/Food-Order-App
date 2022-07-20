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
  // const authUserId = useSelector((state) => state.auth.userId);
  const authUserId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    if (authToken) {
      setIsLogged(true);
      dispatch(
        authActions.login({
          token: authToken,
          userId: authUserId,
          expirationTime: localStorage.getItem("expirationTime"),
        })
      );
    } else {
      setIsLogged(false);
      dispatch(authActions.logout());
    }
  }, [authToken, dispatch, authUserId]);

  return (
    <>
      <header className={classes.header}>
        <Link to="/Meals">
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

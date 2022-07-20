import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

import classes from "./AuthForm.module.css";

let API_KEY = process.env.REACT_APP_FIREBASE_KEY;

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(res);

      setIsLoading(false);

      if (!res.ok) {
        const data = await res.json();
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      // setData(data);
      // console.log(data);

      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );

      dispatch(
        authActions.login({
          token: data.idToken,
          userId: data.localId,
          expirationTime: expirationTime.toISOString(),
        })
      );

      navigate("/meals");
      // console.log(data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading ? (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          ) : (
            <p>Loading...</p>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

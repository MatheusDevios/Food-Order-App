import React from "react";
import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isPostalCode = (value) => value.trim().length === 7;

const Checkout = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);
  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput(isNotEmpty);
  const {
    value: codeValue,
    isValid: codeIsValid,
    hasError: codeError,
    valueChangeHandler: codeChangeHandler,
    inputBlurHandler: codeBlurHandler,
    reset: resetCode,
  } = useInput(isPostalCode);
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

  const formIsValid =
    nameIsValid && codeIsValid && streetIsValid && cityIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    console.log("Subimitted");
    console.log(nameValue, streetValue, codeValue, cityValue);

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      postalCode: codeValue,
      city: cityValue,
    });

    resetCity();
    resetCode();
    resetName();
    resetStreet();
  };

  const nameClasses = `${classes.control} ${nameError ? classes.invalid : ""}`;
  const streetClasses = `${classes.control} ${
    streetError ? classes.invalid : ""
  }`;
  const codeClasses = `${classes.control} ${codeError ? classes.invalid : ""}`;
  const cityClasses = `${classes.control} ${cityError ? classes.invalid : ""}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameError && <p> Please enter your Name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetError && <p> Please enter your Street Adress.</p>}
      </div>
      <div className={codeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={codeValue}
          onChange={codeChangeHandler}
          onBlur={codeBlurHandler}
        />
        {codeError && (
          <p> Please enter your Postal Code with no space and 5 digits.</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityError && <p> Please enter your City Name.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCloseCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

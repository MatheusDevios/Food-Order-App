import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <>
      {cartIsShown && <Cart onCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Routes>
        <Route
          path="/meals"
          element={
            <PrivateRoute>
              <Meals />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<AuthForm />} />
      </Routes>
    </>
  );
}

export default App;

import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFound from "./components/NotFound";
import UserInfo from "./components/User/UserInfo";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const navigateToPath = useCallback(() => {
    if (authToken) {
      navigate("/meals");
    } else {
      navigate("/");
    }
  }, [authToken, navigate]);

  useEffect(() => {
    navigateToPath();
  }, [navigateToPath]);

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
        <Route path="/" element={<Navigate replace to="/Auth" />} />
        <Route
          path="/meals"
          element={
            <PrivateRoute>
              <Meals />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/user" element={<UserInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

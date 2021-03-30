import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";

import Navbar from "./components/Navbar/Navbar";
import LoginForm from "./components/SignForms/LoginForm";
import SignupForm from "./components/SignForms/SignupForm";
import UserPage from "./components/UserPage/UserPage";
import { logout, selectAuth, setToken } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectAuth);

  // to check if the user still have token or not (to not lose data when refresh)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationDate = new Date(localStorage.getItem("expirationDate"));

    if (!token) {
      dispatch(logout());
    } else {
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(setToken(localStorage.getItem("token")));
      }
    }
  }, [dispatch]);

  //to prevent user reaching the login and signup path after he is loged in
  let routes = (
    <Switch>
      <Route exact path="/signup">
        <SignupForm />
      </Route>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route exact path="/users/:id">
        <UserPage />
      </Route>
      <Route exact path="/">
        <HomePage token={token} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  if (token !== null) {
    routes = (
      <Switch>
        <Route path="/logout" />
        <Route exact path="/users/:id">
          <UserPage />
        </Route>
        <Route exact path="/">
          <HomePage token={token} />
        </Route>
      </Switch>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar isAuth={token} />
        {routes}
      </div>
    </Router>
  );
}

export default App;

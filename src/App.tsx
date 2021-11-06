import React, { useEffect } from "react";
import "./App.css";
import { useDarkMode } from "./hook/useDarkMode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Cryptocurrency from "./pages/Cryptocurrency";
import { subscribeToAuthChanges } from "./firebase/FirebaseAuthService";
import { useDispatch } from "react-redux";
import { setUser, User } from "./state/slices/userSlice";

function App() {
  useDarkMode();

  const dispatch = useDispatch();

  useEffect(() => {
    subscribeToAuthChanges((user) => dispatch(setUser(user)));
  }, []);

  return (
    <Router>
      <div className="min-h-screen dark:bg-black">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/">
            <Navbar />
            <Main />
          </Route>
          <Route exact path="/crypto/:cryptoId">
            <Navbar />
            <Cryptocurrency />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

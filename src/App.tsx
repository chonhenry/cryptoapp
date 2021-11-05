import React, { useState, useEffect } from "react";
import "./App.css";
import { useDarkMode } from "./hook/useDarkMode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Cryptocurrency from "./pages/Cryptocurrency";
import { subscribeToAuthChanges } from "./firebase/FirebaseAuthService";

function App() {
  useDarkMode();

  useEffect(() => {
    subscribeToAuthChanges();
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

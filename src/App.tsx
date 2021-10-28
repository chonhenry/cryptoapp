import React, { useEffect } from "react";
import "./App.css";
import { useDarkMode, toggleTheme } from "./hook/useDarkMode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoginB from "./pages/LoginB";
import Navbar from "./components/Navbar";

function App() {
  useDarkMode();

  return (
    <Router>
      <div className=" justify-center items-center min-h-screen dark:bg-black">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Navbar />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

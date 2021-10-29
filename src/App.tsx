import React, { useEffect } from "react";
import "./App.css";
import { useDarkMode, toggleTheme } from "./hook/useDarkMode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";

function App() {
  useDarkMode();

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

        <Navbar />

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import "./App.css";
import { useDarkMode, toggleTheme } from "./hook/useDarkMode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoginB from "./pages/LoginB";

// interface TestInterface {
//   value: number;
//   match?: any;
// }

function App() {
  useDarkMode();

  return (
    <Router>
      <div className="justify-center items-center min-h-screen ">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

/* <div className="bg-blue-100 dark:bg-blue-800 w-screen h-screen">
      <div className="text-green">green</div>
      <div className="text-red">red</div>
      <button onClick={toggleTheme}>toggle theme</button>
</div> */

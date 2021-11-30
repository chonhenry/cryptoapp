import { useEffect, useState } from "react";
import "./App.css";
import { useDarkMode } from "./hook/useDarkMode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Cryptocurrency from "./pages/Cryptocurrency";
import Transaction from "./pages/Transaction";
import Portfolio from "./pages/Portfolio";
import History from "./pages/History";
import PrivateRoute from "./components/PrivateRoute";
import { subscribeToAuthChanges } from "./firebase/FirebaseAuthService";
import { useDispatch } from "react-redux";
import { setUser } from "./state/slices/userSlice";
import { getCryptos } from "./state/slices/cryptosSlice";

function App() {
  useDarkMode();

  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    subscribeToAuthChanges((user) => dispatch(setUser(user)), setIsAuth);
    dispatch(getCryptos());
  }, [dispatch]);

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

          <Route exact path="/">
            <Navbar />
            <Main />
          </Route>
          <Route exact path="/crypto/:cryptoId">
            <Navbar />
            <Cryptocurrency />
          </Route>

          <PrivateRoute
            exact
            isAuth={isAuth}
            component={Transaction}
            path="/transaction/:crypto"
          />
          <PrivateRoute
            exact
            isAuth={isAuth}
            component={Portfolio}
            path="/portfolio"
          />
          <PrivateRoute
            exact
            isAuth={isAuth}
            component={History}
            path="/history"
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

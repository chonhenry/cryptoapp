import React from "react";
import Navbar from "./Navbar";
import { Route, Redirect } from "react-router-dom";

interface Props {
  component: React.FC<{}>;
  exact: boolean;
  path: string;
  isAuth: boolean | undefined;
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  isAuth,
  ...rest
}) => {
  if (!isAuth && isAuth !== false) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <>
            <Navbar />
            {<Component />}
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

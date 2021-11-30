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
  if (isAuth === undefined) {
    return <div>Loading...</div>;
  }
  console.log(isAuth);

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

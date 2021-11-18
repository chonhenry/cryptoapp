import React from "react";
import { useLocation, Redirect } from "react-router-dom";

interface LocationState {
  id: number;
  name: string;
}

const Transaction = () => {
  const location = useLocation<LocationState>();

  if (!location.state) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-xs h-3/6 border-gray-50 rounded">
        {location.state.name}
      </form>
    </div>
  );
};

export default Transaction;

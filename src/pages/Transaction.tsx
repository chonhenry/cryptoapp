import React from "react";
import { useLocation } from "react-router-dom";

const Transaction = () => {
  const location = useLocation();
  console.log(location.state);

  return <div>Transaction</div>;
};

export default Transaction;

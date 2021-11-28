import React from "react";
import { Transaction } from "../firebase/FirebaseFirestoreService";

interface Props {
  transaction: Transaction;
}

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  return (
    <div className="hover:bg-gray-100 cursor-pointer border-b py-6 px-3 flex justify-between">
      {/* {transaction.date.getDate()} */}
      <div className=""></div>
    </div>
  );
};

export default TransactionItem;

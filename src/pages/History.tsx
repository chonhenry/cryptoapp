import React, { useEffect, useState } from "react";
import TransactionItem from "../components/TransactionItem";
import { getTransactions } from "../firebase/FirebaseFirestoreService";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Transaction } from "../firebase/FirebaseFirestoreService";

enum Filter {
  ALL = "all",
  BUY = "buy",
  SELL = "sell",
}

const History: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  useEffect(() => {
    if (!user) return;

    getTransactions(user.id).then((res) => {
      setTransactions(res);
    });
  }, [user]);

  const handleClick = (selected: Filter) => {
    setFilter(selected);
  };

  const renderTransactions = () => {
    if (filter === Filter.ALL) {
      return transactions.map((transaction) => (
        <TransactionItem
          key={transaction.transactionId}
          transaction={transaction}
        />
      ));
    }

    return transactions
      .filter((transaction) => transaction.type === filter)
      .map((transaction) => (
        <TransactionItem
          key={transaction.transactionId}
          transaction={transaction}
        />
      ));
  };

  return (
    <div className="max-w-2xl mt-6 m-auto flex justify-center ">
      <section className="w-full dark:text-white">
        <div className="text-3xl mb-6">Your transactions history</div>

        <div className="flex justify-start mb-6">
          <div
            className={`px-2 mr-2 cursor-pointer ${
              filter === Filter.ALL ? "border-b-2 border-green_base" : ""
            }`}
            onClick={() => handleClick(Filter.ALL)}
          >
            All
          </div>
          <div
            className={`px-2 mr-2 cursor-pointer ${
              filter === Filter.BUY ? "border-b-2 border-green_base" : ""
            }`}
            onClick={() => handleClick(Filter.BUY)}
          >
            Buy
          </div>
          <div
            className={`px-2 cursor-pointer ${
              filter === Filter.SELL ? "border-b-2 border-green_base" : ""
            }`}
            onClick={() => handleClick(Filter.SELL)}
          >
            Sell
          </div>
        </div>

        {transactions.length > 0 && renderTransactions()}
      </section>
    </div>
  );
};

export default History;

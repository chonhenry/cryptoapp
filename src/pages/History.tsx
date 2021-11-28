import React, { useEffect, useState } from "react";
import TransactionItem from "../components/TransactionItem";
import { getTransactions } from "../firebase/FirebaseFirestoreService";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Transaction } from "../firebase/FirebaseFirestoreService";

const History: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!user) return;

    getTransactions(user.id).then((res) => {
      setTransactions(res);
    });
  }, [user]);

  return (
    <div className="max-w-2xl mt-6 m-auto flex justify-center ">
      <section className="w-full">
        <div className="text-3xl mb-6 dark:text-white">
          Your transactions history
        </div>

        <div className="flex justify-start mb-6">
          <div className="px-2 mr-2 border-b-2 border-green_base cursor-pointer">
            All
          </div>
          <div className="px-2 mr-2 cursor-pointer">Buy</div>
          <div className="px-2 cursor-pointer">Sell</div>
        </div>

        {transactions.length > 0 && (
          <div className="">
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.transactionId}
                transaction={transaction}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default History;

import React from "react";
import { Transaction } from "../firebase/FirebaseFirestoreService";
import { Link } from "react-router-dom";

interface Props {
  transaction: Transaction;
}

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${months[month]} ${day}, ${year}`;
  };

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return (
    <Link
      to={`/crypto/${transaction.coinId}`}
      className="hover:bg-gray-100 cursor-pointer border-b py-6 px-3 flex justify-between"
    >
      <div className="">
        <div className="font-semibold">
          {transaction.name}{" "}
          <span className="capitalize">{transaction.type}</span>
        </div>
        <div className="text-sm">{formatDate(transaction.date)}</div>
      </div>

      <div className="text-right">
        <div className="font-semibold">
          {formatCurrency.format(transaction.qty * transaction.price)}
        </div>
        <div className="text-sm">
          {`${transaction.qty} ${transaction.symbol} at ${formatCurrency.format(
            transaction.price
          )}`}
        </div>
      </div>
    </Link>
  );
};

export default TransactionItem;

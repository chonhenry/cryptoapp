import React from "react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  symbol: string;
  qty: number;
  coinId: number;
  price: number | null;
}

const PortfolioItem: React.FC<Props> = ({
  name,
  symbol,
  qty,
  coinId,
  price,
}) => {
  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return (
    <Link
      to={`/crypto/${coinId}`}
      className="py-3 px-6 border-t flex justify-between hover:bg-gray-50 dark:text-white dark:border-gray-500"
    >
      <div className="text-left flex-1">{name}</div>
      <div className="text-left flex-1">{symbol}</div>
      <div className="text-left flex-1">{qty}</div>
      <div className="text-left flex-1">
        {price ? formatCurrency.format(price) : "N/A"}
      </div>
      <div className="text-left flex-1">
        {price ? formatCurrency.format(price * qty) : "N/A"}
      </div>
    </Link>
  );
};

export default PortfolioItem;

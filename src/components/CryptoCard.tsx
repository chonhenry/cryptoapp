import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  coinId: number;
  price: number;
  volume: number;
  marketCap: number;
  rank: number;
  icon: string;
}

const CryptoCard: React.FC<Props> = ({
  name,
  coinId,
  price,
  volume,
  marketCap,
  rank,
  icon,
}) => {
  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return (
    <Link
      to={`/crypto/${coinId}`}
      className="bg-white border rounded-md dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
    >
      <div className="m-3 flex justify-between items-center">
        <div className="">{`${rank}. ${name}`}</div>
        <div className="h-9">
          <img className="h-full" src={icon} />
        </div>
      </div>

      <div className="h-px bg-gray-300 my-3 dark:bg-gray-500" />

      <div className="m-3">
        <div className="">Price: {formatCurrency.format(price)}</div>
        <div className="">Market Cap: {millify(marketCap)}</div>
        <div className="">Volume: {millify(volume)}</div>
      </div>
    </Link>
  );
};

export default CryptoCard;

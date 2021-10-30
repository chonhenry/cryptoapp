import React from "react";
import { Crypto, CryptoHistory } from "../API/api";

interface Props {
  crypto: Crypto | undefined;
  cryptoHistory: CryptoHistory[] | undefined;
}

const ChartSection: React.FC<Props> = ({ crypto, cryptoHistory }) => {
  console.log(cryptoHistory);

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const priceDiff = (lastestPrice: string, oldestPrice: string): string => {
    let diff = parseFloat(lastestPrice) - parseFloat(oldestPrice);

    return (diff >= 0 ? "+" : "") + formatCurrency.format(diff);
  };

  return (
    <div>
      {crypto && cryptoHistory && cryptoHistory?.length > 0 ? (
        <>
          <div className="text-3xl">{crypto.name}</div>
          <div className="text-3xl">
            {formatCurrency.format(parseFloat(crypto.price))}
          </div>
          <div className="text-sm">
            {priceDiff(
              cryptoHistory[cryptoHistory.length - 1].price,
              cryptoHistory[0].price
            )}
            <span className="ml-1">Today</span>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default ChartSection;

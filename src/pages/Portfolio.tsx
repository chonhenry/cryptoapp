import React, { useEffect, useState, useMemo } from "react";
import PortfolioItem from "../components/PortfolioItem";
import { getOwnedCoin } from "../firebase/FirebaseFirestoreService";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { OwnedCoin } from "../firebase/FirebaseFirestoreService";

const Portfolio: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const cryptos = useSelector((state: RootState) => state.cryptos.list);

  const [coins, setCoins] = useState<OwnedCoin[]>([]);
  const [totalValue, setTotalValue] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    getOwnedCoin(user.id).then((res) => {
      setCoins(res);
    });
  }, [cryptos, user]);

  const renderCoins = useMemo(() => {
    let price: number | null;
    let total = 0;

    const items = coins.map((coin) => {
      for (let i = 0; i < cryptos.length; i++) {
        if (cryptos[i].id === coin.coinId) {
          price = parseFloat(cryptos[i].price);
          total += price * coin.qty;
          break;
        }
      }

      return (
        <PortfolioItem
          key={coin.coinId}
          name={coin.name}
          symbol={coin.symbol}
          qty={coin.qty}
          coinId={coin.coinId}
          price={price !== null ? price : null}
        />
      );
    });

    setTotalValue(total);

    return items;
  }, [coins, cryptos]);

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return (
    <div className="w-full mt-6 m-auto border rounded-md md:max-w-3xl dark:border-gray-500">
      <div className="py-3 px-6 border-b dark:text-white text-xl dark:border-gray-500">
        Your Portfolio{" "}
        {totalValue ? `- ${formatCurrency.format(totalValue)}` : ""}
      </div>

      <div className="py-3 px-6 flex justify-between font-bold dark:text-gray-500 dark:border-gray-500">
        <div className="flex-1">Name</div>
        <div className="flex-1">Symbol</div>
        <div className="flex-1">Qty</div>
        <div className="flex-1">Current Price</div>
        <div className="flex-1">Value</div>
      </div>

      <>{coins.length > 0 && renderCoins}</>
    </div>
  );
};

export default Portfolio;

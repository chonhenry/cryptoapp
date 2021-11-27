import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Link } from "react-router-dom";
import { CryptosStatus } from "../state/slices/cryptosSlice";
import CryptoCard from "../components/CryptoCard";

const Main: React.FC = () => {
  const cryptos = useSelector((state: RootState) => state.cryptos.list);
  const loading = useSelector((state: RootState) => state.cryptos.status);

  return (
    <div className="max-w-5xl mt-6 m-auto flex justify-center flex-col">
      <section className="px-3 sm:px-0">
        <div className="text-3xl mb-3 dark:text-white">
          Top 10 Cryptocurrencies in the world
        </div>
        {loading === CryptosStatus.SUCCESS && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {cryptos.slice(0, 10).map((crypto, key) => (
              <CryptoCard
                name={crypto.name}
                coinId={crypto.id}
                price={parseFloat(crypto.price)}
                volume={crypto.volume}
                marketCap={crypto.marketCap}
                rank={key + 1}
                key={crypto.id}
                icon={crypto.iconUrl}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Main;

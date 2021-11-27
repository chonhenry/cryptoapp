import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { CryptosStatus } from "../state/slices/cryptosSlice";
import { getCryptoNews, CryptoNews } from "../API/CryptoNewsApi";
import CryptoCard from "../components/CryptoCard";
import News from "../components/News";

const Main: React.FC = () => {
  const cryptos = useSelector((state: RootState) => state.cryptos.list);
  const loading = useSelector((state: RootState) => state.cryptos.status);

  const [news, setNews] = useState<CryptoNews[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCryptoNews("cryptocurrency")
      .then((res) => {
        setNews(res);
      })
      .catch((error: any) => {
        setError(true);
      });
  }, []);

  return (
    <div className="max-w-5xl mt-6 m-auto flex justify-center flex-col">
      <section className="px-3 sm:px-0 mb-10">
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

      <section className="px-3 sm:px-0 mb-20">
        <div className="text-3xl mb-3 dark:text-white">
          Latest Cryptocurrencies news
        </div>
        {news.length > 0 && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
            {news.map((n) => (
              <News news={n} />
            ))}
          </div>
        )}
        {error && <div className="dark:text-white">News not available</div>}
      </section>
    </div>
  );
};

export default Main;

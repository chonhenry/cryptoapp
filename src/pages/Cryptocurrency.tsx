import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Crypto, getCrypto } from "../API/CryptoApi";
import { getCryptoNews, CryptoNews } from "../API/CryptoNewsApi";
import ChartSection from "../components/ChartSection";
import CryptoDetails from "../components/CryptoDetails";

interface CryptoId {
  cryptoId: string;
}

const Cryptocurrency: React.FC = () => {
  const { cryptoId } = useParams<CryptoId>();

  const [crypto, setCrypto] = useState<Crypto>();
  const [news, setNews] = useState<CryptoNews[]>([]);

  const fetchCryptoInfo = async (id: number) => {
    try {
      const data = await getCrypto(id);
      setCrypto(data);

      const news = await getCryptoNews(data.name);
      setNews(news);
    } catch (error) {}
  };

  useEffect(() => {
    const getData = async () => {
      await fetchCryptoInfo(parseInt(cryptoId));
    };

    getData();
  }, [cryptoId]);

  return (
    <div className="w-full mt-6 m-auto pb-32  md:max-w-5xl">
      <div className="mx-7">
        {crypto && (
          <>
            <ChartSection crypto={crypto} />
            <CryptoDetails crypto={crypto} news={news} />
          </>
        )}
      </div>
    </div>
  );
};

export default Cryptocurrency;

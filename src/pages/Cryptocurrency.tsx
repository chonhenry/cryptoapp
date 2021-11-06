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
  // const [cryptoHistory, setCryptoHistory] = useState<CryptoHistory[]>([]);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(true);

  const fetchCrypto = async (id: number) => {
    try {
      const data = await getCrypto(id);
      setCrypto(data);
      // console.log(data);
    } catch (error) {}
  };

  const fetchCryptoNews = async (q: string) => {
    try {
      const news = await getCryptoNews(q);
      // console.log(news);
      setNews(news);
    } catch (error) {}
  };

  useEffect(() => {
    const getData = async () => {
      await fetchCrypto(parseInt(cryptoId));

      if (crypto) {
        await fetchCryptoNews(crypto.name);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (crypto) {
        await fetchCryptoNews(crypto.name);
      }
    };

    getData();
  }, [crypto]);

  return (
    // <div className="max-w-5xl mt-6 m-auto flex justify-between items-center pb-32 bg-green_base">
    <div className="w-full mt-6 m-auto pb-32  md:max-w-5xl">
      <div className="mx-7">
        {crypto && (
          <>
            <ChartSection crypto={crypto} />
          </>
        )}
        {crypto && (
          <>
            <CryptoDetails crypto={crypto} news={news} />
          </>
        )}
      </div>
    </div>
  );
};

export default Cryptocurrency;

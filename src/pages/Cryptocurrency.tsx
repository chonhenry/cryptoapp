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

  const fetchCryptoNews = async () => {
    try {
      const news = await getCryptoNews();
      console.log(news);
      setNews(news);
    } catch (error) {}
  };

  useEffect(() => {
    const getData = async () => {
      await fetchCrypto(parseInt(cryptoId));
      await fetchCryptoNews();
      // setLoading(false);
    };

    getData();
  }, []);

  return (
    <div className="max-w-5xl mt-6 m-auto flex justify-between">
      <div className="w-8/12 mr-8">
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

      <div className="bg-gray-500 w-4/12">svsdfv</div>
    </div>
  );
};

export default Cryptocurrency;

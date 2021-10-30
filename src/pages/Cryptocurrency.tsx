import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Crypto, CryptoHistory, getCrypto, getCryptoHistory } from "../API/api";
import ChartSection from "../components/ChartSection";

interface CryptoId {
  cryptoId: string;
}

const Cryptocurrency: React.FC = () => {
  const { cryptoId } = useParams<CryptoId>();

  const [crypto, setCrypto] = useState<Crypto>();
  const [cryptoHistory, setCryptoHistory] = useState<CryptoHistory[]>([]);
  // const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCrypto = async (id: number) => {
    try {
      const data = await getCrypto(id);
      setCrypto(data);
      // console.log(data);
    } catch (error) {}
  };

  const fetchCryptoHistory = async (id: number) => {
    try {
      const data = await getCryptoHistory(id);
      setCryptoHistory(data);
    } catch (error) {}
  };

  useEffect(() => {
    const getData = async () => {
      await fetchCrypto(parseInt(cryptoId));
      await fetchCryptoHistory(parseInt(cryptoId));
      setLoading(false);
    };

    getData();
  }, []);

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return (
    <div className="max-w-5xl mt-6 m-auto flex justify-between">
      <div className="w-7/12 mr-8">
        <ChartSection crypto={crypto} cryptoHistory={cryptoHistory} />
      </div>

      <div className="bg-gray-500 w-5/12">svsdfv</div>
    </div>
  );
};

export default Cryptocurrency;

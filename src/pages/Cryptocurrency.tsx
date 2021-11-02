import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Crypto, getCrypto } from "../API/api";
import ChartSection from "../components/ChartSection";
import CryptoDetails from "../components/CryptoDetails";

interface CryptoId {
  cryptoId: string;
}

const Cryptocurrency: React.FC = () => {
  const { cryptoId } = useParams<CryptoId>();

  const [crypto, setCrypto] = useState<Crypto>();
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

  const fetchCryptoHistory = async (id: number) => {
    // try {
    //   const data = await getCryptoHistory(id);
    //   setCryptoHistory(data);
    // } catch (error) {}
  };

  useEffect(() => {
    const getData = async () => {
      await fetchCrypto(parseInt(cryptoId));
      await fetchCryptoHistory(parseInt(cryptoId));
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
            <CryptoDetails crypto={crypto} />
          </>
        )}
      </div>

      <div className="bg-gray-500 w-4/12">svsdfv</div>
    </div>
  );
};

export default Cryptocurrency;

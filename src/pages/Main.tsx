import React, { useState, useEffect } from "react";
import { Crypto, getCryptos, getCrypto } from "../API/api";

const Main = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [crypto, setCrypto] = useState<Crypto>();
  const [error, setError] = useState(false);

  useEffect(() => {
    getCrypto(1)
      .then((data) => {
        console.log("data", data);
        setCrypto(data);
      })
      .catch((error) => {
        // console.log("error", error);
        setError(true);
      });
  }, []);

  return <div className="max-w-5xl bg-red_base m-auto">{crypto?.name}</div>;
};

export default Main;

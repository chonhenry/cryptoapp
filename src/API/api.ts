import axios from "axios";

export interface Crypto {
  id: number;
  uuid: string;
  slug: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  numberOfMarkets: number;
  numberOfExchanges: number;
  volume: number;
  marketCap: number;
  price: string;
  rank: number;
}

export interface CryptoHistory {
  price: string;
  timestamp: number;
}

export const getCryptos = async (): Promise<Crypto[]> => {
  try {
    const res = await axios.get("https://coinranking1.p.rapidapi.com/coins", {
      headers: {
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_CRYPTO_API_KEY!,
      },
    });

    const data = await res.data.data.coins;
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getCrypto = async (coinId: number): Promise<Crypto> => {
  try {
    const res = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
      {
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_CRYPTO_API_KEY!,
        },
      }
    );

    const data = res.data.data.coin;
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getCryptoHistory = async (
  coinId: number
): Promise<CryptoHistory[]> => {
  // 3h 24h 7d 30d 3m 1y 3y 5y
  try {
    const res = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}/history/24h`,
      {
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_CRYPTO_API_KEY!,
        },
      }
    );

    const data = res.data.data.history;
    // console.log(data);
    return data;
  } catch (error: any) {
    throw error;
  }
};

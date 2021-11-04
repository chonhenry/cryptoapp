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
  totalSupply: number;
  allTimeHigh: {
    price: string;
    timestamp: number;
  };
}

export interface CryptoHistory {
  price: string;
  timestamp: number;
}

export interface Timerange {
  "1D": string;
  "1W": string;
  "1M": string;
  "1Y": string;
  "5Y": string;
}

export type TimerangeType = keyof Timerange;

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
  coinId: number,
  t: TimerangeType = "1D"
): Promise<CryptoHistory[]> => {
  try {
    const timerange: Timerange = {
      "1D": "24h",
      "1W": "7d",
      "1M": "30d",
      "1Y": "1y",
      "5Y": "5y",
    };

    const res = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}/history/${timerange[t]}`,
      {
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_CRYPTO_API_KEY!,
        },
      }
    );

    const data = res.data.data.history;
    return data;
  } catch (error: any) {
    throw error;
  }
};

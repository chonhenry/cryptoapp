import React, { useState, useEffect } from "react";
import {
  Crypto,
  CryptoHistory,
  getCryptoHistory,
  Timerange,
  TimerangeType,
} from "../API/CryptoApi";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

interface Props {
  crypto: Crypto;
  // cryptoHistory: CryptoHistory[] | undefined;
}

const ChartSection: React.FC<Props> = ({ crypto }) => {
  const [cryptoHistory, setCryptoHistory] = useState<CryptoHistory[]>([]);
  const [currentTimerange, setCurrentTimerange] = useState<TimerangeType>("1D");
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [isProfit, setIsProfit] = useState(true);
  // const [loading, setLoading] = useState(true);

  const user = useSelector((state: RootState) => state.user.user);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Price",
        data: prices,
        fill: false,
        borderWidth: 2,
        borderColor: isProfit ? "rgb(0,200,5)" : "#ff5000",
        tension: 0.1,
        pointBorderColor: "rgba(0, 0, 0, 0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        pointHoverBackgroundColor: isProfit ? "rgb(0,200,5)" : "#ff5000",
        pointHoverRadius: 3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      xAxes: {
        display: false,
      },
      yAxes: {
        display: false,
      },
    },
  };

  const timerange: Timerange = {
    "1D": "Today",
    "1W": "Past Week",
    "1M": "Past Month",
    "1Y": "Past Year",
    "5Y": "Past 5 Years",
  };

  useEffect(() => {
    fetchCryptoHistory(crypto.id, currentTimerange);
  }, [currentTimerange, crypto.id]);

  const fetchCryptoHistory = async (id: number, time: TimerangeType) => {
    try {
      const data = await getCryptoHistory(id, time);

      setCryptoHistory(data);
      // console.log(data);

      let prices: string[] = [];
      let timestamps: string[] = [];

      data.forEach((d) => {
        prices.push(d.price);

        const date = new Date(d.timestamp).toLocaleString();
        timestamps.push(date);
      });

      setIsProfit(
        parseFloat(data[data.length - 1].price) - parseFloat(data[0].price) >= 0
          ? true
          : false
      );

      setPrices(prices);
      setTimestamps(timestamps);
      // setLoading(false);
    } catch (error) {}
  };

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const priceDiff = (lastestPrice: string, oldestPrice: string): number => {
    let diff = parseFloat(lastestPrice) - parseFloat(oldestPrice);

    return diff;
  };

  const percentageDiff = (
    lastestPrice: string,
    oldestPrice: string
  ): string => {
    let diff =
      ((parseFloat(lastestPrice) - parseFloat(oldestPrice)) /
        parseFloat(oldestPrice)) *
      100;

    diff = Math.round(diff * 100) / 100;

    return (diff >= 0 ? "+" : "") + diff + "%";
  };

  const hadnleClick = (t: any) => {
    setCurrentTimerange(t);
  };

  return (
    <div className="mb-10">
      {crypto && cryptoHistory?.length > 0 ? (
        <>
          <div className="dark:text-white">
            <div className="text-3xl flex items-center">
              {crypto.name}
              {user && (
                <Link
                  className="ml-3 text-sm px-2 py-1 bg-green_base text-white rounded"
                  to={{
                    pathname: `/transaction/${crypto.name}`,
                    state: {
                      id: crypto.id,
                      name: crypto.name,
                      symbol: crypto.symbol,
                      price: parseFloat(crypto.price),
                    },
                  }}
                >
                  Buy/Sell
                </Link>
              )}
            </div>
            <div className="text-3xl">
              {formatCurrency.format(parseFloat(crypto.price))}
            </div>
          </div>
          <div
            className={`text-sm ${
              isProfit ? "text-green_base" : "text-red_base"
            }`}
          >
            {isProfit && "+"}
            {formatCurrency.format(
              priceDiff(
                cryptoHistory[cryptoHistory.length - 1].price,
                cryptoHistory[0].price
              )
            )}
            <span className="ml-1">{`(${percentageDiff(
              cryptoHistory[cryptoHistory.length - 1].price,
              cryptoHistory[0].price
            )})`}</span>
            <span className="ml-1 text-gray-500">
              {timerange[currentTimerange]}
            </span>
          </div>
          <Line data={data} options={options} />
          <div className="w-full mt-6 border-b-2 border-gray-300 dark:border-gray-800 flex">
            {Object.keys(timerange).map((key) => {
              return (
                <div
                  className={`cursor-pointer mx-2 mb-2 hover:${
                    isProfit ? "text-green_base" : "text-red_base"
                  } ${
                    key !== currentTimerange
                      ? "dark:text-white"
                      : isProfit
                      ? "text-green_base"
                      : "text-red_base"
                  }`}
                  key={key}
                  onClick={() => hadnleClick(key)}
                >
                  {key}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default ChartSection;

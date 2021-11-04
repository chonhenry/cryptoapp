import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { Crypto } from "../API/CryptoApi";
import { CryptoNews } from "../API/CryptoNewsApi";

interface Props {
  crypto: Crypto;
  news: CryptoNews[];
}

enum Expand {
  TRUE = "See Less",
  FALSE = "See More",
}

const CryptoDetails: React.FC<Props> = ({ crypto, news }) => {
  const [description, setDescription] = useState<
    string | JSX.Element | JSX.Element[]
  >("");
  const [canExpand, setCanExpand] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const parsedHtml = HTMLReactParser(crypto.description);

  useEffect(() => {
    if (parsedHtml instanceof Array) {
      // console.log(parsedHtml[0]);
      setDescription(parsedHtml[0]);
      if (parsedHtml.length > 1) {
        setCanExpand(true);
      }
    } else {
      setDescription(parsedHtml);
    }
  }, []);

  const handleDescClick = () => {
    if (isExpanded) {
      if (parsedHtml instanceof Array) {
        setDescription(parsedHtml[0]);
      }
    } else {
      setDescription(parsedHtml);
    }

    setIsExpanded((prev) => !prev);
  };

  const statsCard = (title: string, value: string | Date) => {
    return (
      <div className="">
        <div className="font-bold">{title}</div>
        <div className="">{value}</div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="text-xl dark:text-white">About</div>
      <div className="h-0.5 bg-gray-300 dark:bg-gray-800 my-3"></div>
      <div className="coin_desc dark:text-white mb-10">
        {description}
        {canExpand && (
          <div
            className="text-green_base cursor-pointer"
            onClick={handleDescClick}
          >
            {isExpanded ? Expand.TRUE : Expand.FALSE}
          </div>
        )}
      </div>

      <div className="text-xl dark:text-white">Statistics</div>
      <div className="h-0.5 bg-gray-300 dark:bg-gray-800 my-3"></div>
      <div className="flex justify-between pr-10 mb-10">
        {statsCard("Market Cap", millify(crypto.marketCap))}
        {statsCard("Total Supply", millify(crypto.totalSupply))}
        {statsCard("Volume", millify(crypto.volume))}
        {statsCard(
          "All Time High",
          `${millify(parseInt(crypto.allTimeHigh.price))} at ${new Date(
            crypto.allTimeHigh.timestamp
          ).toLocaleDateString()}`
        )}
      </div>

      {/* <div className="text-xl dark:text-white">News</div> */}
    </div>
  );
};

export default CryptoDetails;

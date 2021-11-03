import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { Crypto } from "../API/CryptoApi";

interface Props {
  crypto: Crypto;
}

enum Expand {
  TRUE = "See Less",
  FALSE = "See More",
}

const CryptoDetails: React.FC<Props> = ({ crypto }) => {
  const [description, setDescription] = useState<
    string | JSX.Element | JSX.Element[]
  >("");
  const [canExpand, setCanExpand] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const parsedHtml = HTMLReactParser(crypto.description);

  useEffect(() => {
    if (parsedHtml instanceof Array) {
      console.log(parsedHtml[0]);
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

  return (
    <div className="">
      <div className="text-xl dark:text-white">About</div>
      <div className="h-0.5 bg-gray-300 dark:bg-gray-800 my-3"></div>
      <div className="coin_desc dark:text-white">
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
    </div>
  );
};

export default CryptoDetails;

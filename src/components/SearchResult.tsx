import React from "react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  symbol: string;
  id: number;
  onClick: () => void;
}

const SearchResult: React.FC<Props> = ({ name, symbol, id, onClick }) => {
  return (
    <div className="dark:bg-white text-sm hover:bg-gray-200" onClick={onClick}>
      <Link className="block w-full px-3 py-2" to={`/crypto/${id}`}>
        <span className="inline-block w-16">{symbol}</span>
        <span>{name}</span>
      </Link>
    </div>
  );
};

export default SearchResult;

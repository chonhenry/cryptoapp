import React, { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Crypto } from "../API/CryptoApi";
import SearchResult from "./SearchResult";

const Navbar: React.FC = () => {
  const cryptos = useSelector((state: RootState) => state.cryptos);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [displaySearch, setDisplaySearch] = useState(false);
  const [foundCryptos, setFoundCryptos] = useState<Crypto[]>([]);

  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e: any) => {
    if (!ref.current) return;

    if (ref.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setDisplaySearch(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    const text = e.target.value.toLowerCase();
    if (cryptos.list.length === 0) {
      return;
    }

    const cryptosList = cryptos.list;

    setFoundCryptos(
      cryptosList.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(text) ||
          crypto.symbol.toLowerCase().includes(text)
      )
    );

    if (!displaySearch) setDisplaySearch(true);
  };

  return (
    <nav className="w-full h-16 flex items-center justify-center sticky top-0 bg-white dark:bg-black">
      <ul className="w-full flex justify-center items-center max-w-5xl relative mx-7">
        <li className="mr-auto">
          <Link to="/">
            <i
              className="fas fa-wave-square text-black dark:text-white
             hover:text-green_base dark:hover:text-green_base text-3xl"
            ></i>
          </Link>
        </li>

        <li className="relative w-8/12 mx-3 md:w-96 md:mx-0" ref={ref}>
          <input
            type="text"
            className="border rounded py-2 px-3 w-full leading-tight bg-transparent text-black dark:text-white focus:outline-none focus:shadow-outline"
            onChange={(e) => handleChange(e)}
            onClick={() => setDisplaySearch(true)}
            value={search}
          />
          {search.length > 0 && displaySearch && (
            <div className="absolute w-full border rounded">
              {foundCryptos.slice(0, 10).map((crypto) => (
                <SearchResult
                  key={crypto.id}
                  name={crypto.name}
                  symbol={crypto.symbol}
                  id={crypto.id}
                  onClick={() => setSearch("")}
                />
              ))}
            </div>
          )}
        </li>

        <li
          className="cursor-pointer font-mono ml-auto"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <div className="text-black dark:hover:text-green_base dark:text-white">
            Account
          </div>
        </li>

        {dropdownOpen && <Dropdown setDropdownOpen={setDropdownOpen} />}
      </ul>
    </nav>
  );
};

export default Navbar;

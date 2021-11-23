import React, { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import {
  buyCoin,
  checkOwnedQty,
  sellCoin,
} from "../firebase/FirebaseFirestoreService";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

interface LocationState {
  id: number;
  name: string;
  price: number;
  symbol: string;
}

const Transaction: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation<LocationState>();

  const [buy, setBuy] = useState(true);
  const [amount, setAmount] = useState<string | number>("");
  const [alreadyOwned, setAlreadyOwned] = useState(0);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user && user.id) {
      checkOwnedQty(user?.id, location.state.id).then((res) => {
        setAlreadyOwned(res);
      });
    }
  }, [user, location.state.id]);

  if (!location.state || user === null) {
    return <Redirect to="/" />;
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setAmount(e.target.value);
    }

    if (parseFloat(e.target.value) >= 0) {
      setAmount(parseFloat(e.target.value));
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (typeof amount === "string" || amount === 0) {
      return;
    }

    const { name, id, price, symbol } = location.state;

    if (buy) {
      const newQty = await buyCoin(
        { name, symbol, coinId: id, price, qty: amount },
        user.id
      );
      if (newQty !== undefined) {
        setAlreadyOwned(newQty);
        setSuccessMessage(`You have successfully bought ${amount} ${symbol}`);
      }
      return;
    }

    if (alreadyOwned < amount) {
      setError(
        `You can only sell up to ${alreadyOwned} ${location.state.symbol}`
      );
      return;
    }

    const newQty = await sellCoin(
      { name, symbol, coinId: id, price, qty: amount },
      user.id
    );
    if (newQty !== undefined) {
      setAlreadyOwned(newQty);
      setSuccessMessage(`You have successfully sold ${amount} ${symbol}`);
    }
  };

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-sm h-3/6 mt-36 border-gray-200 rounded border dark:border-gray-500 dark:bg-gray-800 dark:text-white">
        <section className="flex border-b border-gray-200 p-3 font-bold dark:border-gray-500">
          <div
            className={`cursor-pointer mr-3 ${buy ? "text-green_base" : ""} `}
            onClick={() => setBuy(true)}
          >
            Buy {location.state.symbol}
          </div>
          {alreadyOwned > 0 && (
            <div
              className={`cursor-pointer mr-3 ${
                !buy ? "text-green_base" : ""
              } `}
              onClick={() => setBuy(false)}
            >
              Sell {location.state.symbol}
            </div>
          )}
        </section>

        <section className="p-3">
          <div className="flex justify-between items-center">
            <label className="">Amount</label>
            <div>
              <input
                className="text-right py-2 px-3 w-32 bg-transparent appearance-none border rounded focus:outline-none focus:border-green_base"
                type="number"
                placeholder="0"
                min="0"
                value={amount}
                onChange={(e) => handleAmountChange(e)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center border-b dark:border-gray-500">
            <div className="">Market Price</div>
            <div className="py-3 pr-3">
              {formatCurrency.format(location.state.price)}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="">{buy ? "Cost" : "Credit"}</div>
            <div className="pt-3 pr-3">
              {typeof amount === "string"
                ? "$0.00"
                : formatCurrency.format(location.state.price * amount)}
            </div>
          </div>
        </section>

        <div className="flex justify-center p-3">
          <button
            className="bg-green_base text-white h-9 w-24 rounded"
            onClick={(e) => handleSubmit(e)}
          >
            {buy ? "Buy" : "Sell"}
          </button>
        </div>

        <div className="text-red-600 text-center">{error}</div>
        <div className="text-green_base text-center">{successMessage}</div>

        <div className="text-center mb-3 dark:text-white">
          You currently own{" "}
          <span className="text-green_base">{alreadyOwned}</span>{" "}
          {location.state.symbol}
        </div>
      </div>
    </div>
  );
};

export default Transaction;

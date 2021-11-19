import React, { useState } from "react";
import { useLocation, Redirect } from "react-router-dom";

interface LocationState {
  id: number;
  name: string;
  price: number;
}

const Transaction: React.FC = () => {
  const location = useLocation<LocationState>();

  const [buy, setBuy] = useState(true);
  const [amount, setAmount] = useState<string | number>("");

  if (!location.state) {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex justify-center items-center">
      <form
        className="w-full max-w-sm h-3/6 mt-36 border-gray-200 rounded border"
        onSubmit={(e) => handleSubmit(e)}
      >
        <section className="flex border-b border-gray-200 p-3 font-bold">
          <div
            className={`cursor-pointer mr-3 ${buy ? "text-green_base" : ""} `}
            onClick={() => setBuy(true)}
          >
            Buy CoinName
          </div>
          <div
            className={`cursor-pointer mr-3 ${!buy ? "text-green_base" : ""} `}
            onClick={() => setBuy(false)}
          >
            Sell CoinName
          </div>
        </section>

        <section className="p-3">
          <div className="flex justify-between items-center">
            <label className="">Amount</label>
            <div>
              <input
                className="text-right py-2 px-3 w-32 appearance-none border rounded focus:outline-none focus:border-green_base"
                type="number"
                placeholder="0"
                min="0"
                value={amount}
                onChange={(e) => handleAmountChange(e)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center border-b">
            <div className="text-green_base">Market Price</div>
            <div className="py-3 pr-3">
              {formatCurrency.format(location.state.price)}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="">Cost</div>
            <div className="pt-3 pr-3">
              {typeof amount === "string"
                ? "$0.00"
                : formatCurrency.format(location.state.price * amount)}
            </div>
          </div>
        </section>

        <div className="flex justify-center p-3">
          <button
            className="bg-green_base text-white py-2 px-8 rounded"
            type="submit"
          >
            {buy ? "Buy" : "Sell"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Transaction;

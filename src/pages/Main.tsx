import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Link } from "react-router-dom";

const Main = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);

  return (
    <div className="max-w-5xl mt-6 m-auto flex justify-center">
      <div className="bg-gray-300 w-9/12 mr-8">
        Your Cryptos
        <Link
          to={{
            pathname: "/transaction",
            state: { id: 6, name: "bitcoin" },
          }}
        >
          transaction
        </Link>
      </div>
      <div className="bg-gray-300 w-3/12">d</div>
    </div>
  );
};

export default Main;

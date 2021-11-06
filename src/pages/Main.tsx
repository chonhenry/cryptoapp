import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const Main = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);

  return (
    <div className="max-w-5xl mt-6 m-auto flex justify-between">
      <div></div>
    </div>
  );
};

export default Main;

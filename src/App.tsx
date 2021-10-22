import React from "react";
import "./App.css";
import useDarkMode from "./hook/useDarkMode";

function App() {
  useDarkMode();

  return (
    <div className="bg-blue-100 dark:bg-blue-800 w-screen h-screen">
      <div className="text-green">green</div>
      <div className="text-red">red</div>
    </div>
  );
}

export default App;

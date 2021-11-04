import React, { useEffect } from "react";
import { CryptoNews } from "../API/CryptoNewsApi";

interface Props {
  news: CryptoNews;
}

const News: React.FC<Props> = ({ news }) => {
  console.log(news);
  return (
    <a
      className=" w-full  py-5 flex text-sm"
      href={news.web_url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex-grow pr-6 ">
        <div className="font-bold dark:text-white">{news.headline.main}</div>
        <div className="text-gray-500 ">{news.snippet}</div>
      </div>

      <div className="w-56 h-32 ml-auto flex-none">
        {news.multimedia.length > 0 ? (
          <img
            className="w-56 h-32 object-cover object-center "
            src={"https://www.nytimes.com/" + news.multimedia[0].url}
            alt="news"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center dark:text-white">
            <i className="fas fa-image text-5xl"></i>
          </div>
        )}
      </div>
    </a>
  );
};

export default News;

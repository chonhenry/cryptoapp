import axios from "axios";

export interface CryptoNews {
  headline: string;
  content: string;
  web_url: string;
  img: string;
}

export const getCryptoNews = async (): Promise<CryptoNews[]> => {
  try {
    // let res = await axios.get(
    //   "https://api.nytimes.com/svc/search/v2/articlesearch.json?",
    //   {
    //     headers: {
    //       "api-key": process.env.REACT_APP_NYTIMES_API_KEY!,
    //     },
    //   }
    // );
    let res = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`
    );

    // console.log(res.data.response.docs);
    return res.data.response.docs;
  } catch (error) {
    throw error;
  }
};

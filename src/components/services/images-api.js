import axios from "axios";

export const fetchImages = async topic => {
  const API_KEY = "jB0iXIVOPKU9hIM7iaw4BgYB87W5iXiKVc43zSkH9-8";
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?query=${topic}&client_id=${API_KEY}`
  );
  return response.data.results;
};

// axios.defaults.baseURL = "https://api.unsplash.com";

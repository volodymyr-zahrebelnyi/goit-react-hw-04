import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImages = async (page, topic) => {
  const API_KEY = "jB0iXIVOPKU9hIM7iaw4BgYB87W5iXiKVc43zSkH9-8";

  const response = await axios.get("/search/photos", {
    params: {
      query: topic,
      client_id: API_KEY,
      orientation: "landscape",
      page,
      per_page: 12,
    },
  });

  return {
    images: response.data.results,
    totalPages: response.data.total_pages,
  };
};

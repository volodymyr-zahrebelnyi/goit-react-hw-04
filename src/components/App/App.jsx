import { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../services/images-api";
import css from "./App.module.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [topic, setTopic] = useState("");

  const handleSearch = newTopic => {
    setTopic(newTopic);
  };

  useEffect(() => {
    if (topic === "") {
      return;
    }

    async function getImages() {
      try {
        const fetchedImages = await fetchImages(topic);
        setImages(fetchedImages);
        console.log(fetchedImages);
      } catch (error) {
        console.log("ERROR!");
      } finally {
      }
    }
    getImages();
  }, [topic]);

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && <ImageGallery items={images} />}
    </div>
  );
}

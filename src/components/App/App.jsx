import { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../services/images-api";
import css from "./App.module.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);

  const handleSearch = newTopic => {
    setTopic(newTopic);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (topic === "") {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const newImages = await fetchImages(page, topic);
        setImages(prevState => [...prevState, ...newImages.images]);
        setTotalPages(newImages.totalPages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [page, topic]);

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && <ImageGallery items={images} />}
      {page >= totalPages && !loading && <b>End of collection!</b>}
      {error && <b>ERROR!</b>}
      {loading && <b>LOADING...</b>}
      {images.length > 0 && !loading && page < totalPages && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
}

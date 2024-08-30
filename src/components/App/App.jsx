import { useState, useEffect } from "react";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import { fetchImages } from "../services/images-api";
import css from "./App.module.css";

Modal.setAppElement("#root");

export default function App() {
  const [images, setImages] = useState([]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

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

  const openModal = image => {
    // if (!modalIsOpen)
    setSelectedImg(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImg(null);
    setModalIsOpen(false);
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && <ImageGallery items={images} onOpen={openModal} />}
      {page >= totalPages && !loading && (
        <b className={css.alert}>End of collection!</b>
      )}
      {error && <b className={css.alert}>ERROR!</b>}
      {loading && (
        <ThreeDots
          className={css.spinner}
          visible={true}
          height="80"
          width="80"
          color="#d651c8"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ justifyContent: "center" }}
          wrapperClass
        />
      )}
      {images.length > 0 && !loading && page < totalPages && (
        <button className={css.btnLoadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}
      {modalIsOpen && selectedImg && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          image={selectedImg}
        />
      )}
    </div>
  );
}

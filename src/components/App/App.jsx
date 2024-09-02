import { useState, useEffect } from "react";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";
import { fetchImages } from "../services/images-api";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import BtnToTop from "../BtnToTop/BtnToTop";
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
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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
    setSelectedImg(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImg(null);
    setModalIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setShowScrollToTop(false);
  };

  useEffect(() => {
    if (page >= 2 && !modalIsOpen) {
      setShowScrollToTop(true);
    }
  }, [page, modalIsOpen]);

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
        />
      )}
      {images.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        image={selectedImg}
      />
      {showScrollToTop && !modalIsOpen && <BtnToTop onClick={scrollToTop} />}
    </div>
  );
}

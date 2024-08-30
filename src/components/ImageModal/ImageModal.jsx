import Modal from "react-modal";
import { useEffect } from "react";

export default function ImageModal({ isOpen, onClose, image }) {
  const modalCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    const handleEsc = evt => {
      if (evt.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalCustomStyles}>
      {image && <img src={image.src} alt={image.description} />}
    </Modal>
  );
}

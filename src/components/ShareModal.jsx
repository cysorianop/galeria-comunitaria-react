import React from "react";
import Modal from "react-modal";

const ShareModal = ({ isOpen, closeModal, handleShare, photo }) => {

  // Modal compartir publicacion
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Compartir Foto"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          maxWidth: "60%",
          maxHeight: "90%",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <h2 className="mb-4">Share posting</h2>
      <div className="card mb-2">
        <div className="card-body">
            <img src={photo.url} alt="Compartir" className="img-fluid" />
        </div>
      </div>
      <div className="btn-container-share-modal">
        <button onClick={closeModal} className="btn btn-marron-semiclaro btn-cancel-modal-share">
          Cancel
        </button>
        <button
          onClick={() => {
            handleShare(photo.id);
            closeModal();
          }}
          className="btn btn-marron-oscuro"
        >
          Share now
        </button>
      </div>
    </Modal>
  );
};

export default ShareModal;
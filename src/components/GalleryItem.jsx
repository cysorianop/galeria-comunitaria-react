import React, { useState } from "react";
import ShareModal from "./ShareModal";

const GalleryItem = ({
  photo,
  handleLike,
  handleAddComment,
  handleShare,
  currentUser,
}) => {
  const [localCommentInput, setLocalCommentInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  // Manejador del botón de compartir, abre el modal y realiza la acción de compartir
  const handleShareButtonClick = () => {
    openModal();
    handleShare(photo.id);
  };

  return (
    <div key={photo.id} className="card mb-3">
      <div className="card-body">
        <img src={photo.url} alt="" className="card-img-top" />
      </div>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0">
            Subido por: <strong>{photo.user}</strong>
          </p>
          <div className="d-flex align-items-center">
            <button
              onClick={() => handleLike(photo.id)}
              className="btn btn-marron-oscuro me-2"
            >
              Like ({photo.likes})
            </button>
            <button
              className="btn btn-marron-semiclaro"
              onClick={handleShareButtonClick}
            >
              Share
            </button>
          </div>
          {/* Modal para compartir */}
          <ShareModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            handleShare={handleShare}
            photo={photo}
          />
        </div>
        <div className="d-flex align-items-center mb-2">
          <input
            type="text"
            placeholder="Add comment"
            value={localCommentInput}
            onChange={(e) => setLocalCommentInput(e.target.value)}
            className="form-control rounded-start"
          />
          <button
            onClick={() => handleAddComment(photo.id, localCommentInput)}
            className="btn btn-marron-claro rounded-end ms-2"
          >
            Comment
          </button>
        </div>
        {photo?.comments?.length > 0 ? (
          <div className="card mt-2">
            <div className="card-body">
              {photo.comments.map((comment, index) => (
                <div key={index} className="mb-2">
                  <strong>{comment.user}:</strong> {comment.comment}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body">
              <p>No comments yet...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryItem;

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Modal from "react-modal";

import { Button } from "react-bootstrap";

Modal.setAppElement("#root");

const CameraComponent = ({ isOpen, onCapture, onClose }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  // Captura una foto utilizando la webcam y actualiza el estado de la imagen
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  // Guarda la foto capturada y cierra el modal si hay una imagen disponible
  const saveAndClose = () => {
    if (image) {
      onCapture(image);
    }
    onClose();
  };

  // Cierra el modal y reinicia el estado de la imagen
  const closeModal = () => {
    setImage(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Tomar Foto"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          maxWidth: "60%", // Ajusta según tus necesidades
          maxHeight: "90%", // Ajusta según tus necesidades
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
      <h2 className="mb-2">Take Foto</h2>
      <div className="card mb-2">
        <div className="card-body custom-container">
        <div className="custom-container-webcam">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
        </div>
        <div style={{ flex: 1 }}>
          {image && <img src={image} alt="Foto tomada" className="webcam-photo" />}
        </div>
      </div>
      </div>
      <div className="btn-container">
        <Button onClick={capture} className="btn btn-take-photo btn-marron-oscuro" >
          Take photo
        </Button>
        <Button className="btn btn-marron-semiclaro" onClick={saveAndClose} disabled={!image}>
          Save photo
        </Button>
        <Button onClick={closeModal} className="btn btn-cancel-modal-camera btn-marron-claro">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default CameraComponent;
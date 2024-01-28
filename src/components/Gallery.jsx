import React, { useEffect, useState } from "react";
import appFirebase from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import GalleryItem from "./GalleryItem";
import CameraModal from "./CameraModal";

// Obtener instancias de autenticación, base de datos y almacenamiento
const auth = getAuth(appFirebase);
const firestore = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

const Gallery = ({ correoUsuario }) => {

  // Estado para controlar el estado de carga al subir una foto
  const [uploading, setUploading] = useState(false);

  // Estado para almacenar las fotos recuperadas de la base de datos
  const [photos, setPhotos] = useState([]);

  // Estado para controlar la apertura y cierre del modal de la cámara
  const [showCameraModal, setShowCameraModal] = useState(false);

  // Estado para controlar si el modal de la cámara está abierto o cerrado
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  // Efecto para recuperar las fotos al cargar el componente
  useEffect(() => {
    const fetchPhotos = async () => {
      const photosCollection = collection(firestore, 'fotos');
      const photosSnapshot = await getDocs(photosCollection);
      const photosData = photosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPhotos(photosData);
    };

    fetchPhotos();
  }, []);

  // Función para compartir una foto
  const handleShare = async (photoId) => {
    const photoRef = doc(firestore, 'fotos', photoId);

    try {
      await updateDoc(photoRef, {
        compartida: true,
      });
    } catch (error) {
      console.error("Error al compartir la foto:", error);
    }
  };

  // Función para dar "like" a una foto
  const handleLike = async (photoId) => {
    const photoRef = doc(firestore, 'fotos', photoId);

    await updateDoc(photoRef, {
      likes: photos.find((photo) => photo.id === photoId).likes + 1,
    });
  };

  // Función para agregar un comentario a una foto
  const handleAddComment = async (photoId, comment) => {
    const photoRef = doc(firestore, 'fotos', photoId);

    await updateDoc(photoRef, {
      comments: [
        ...photos.find((photo) => photo.id === photoId).comments,
        { user: correoUsuario, comment },
      ],
    });
  };

  // Función para subir una foto al almacenamiento y agregarla a la base de datos
  const handleUpload = async (file) => {
    setUploading(true);

    const storageRef = ref(storage, v4());
    const fileRef = await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);

    const infoPhoto = {
      url: photoURL,
      user: correoUsuario,
      likes: 0,
      comments: [],
      compartida: false,
    };

    try {
      await addDoc(collection(firestore, 'fotos'), {
        ...infoPhoto,
      });
    } catch (error) {
      console.log(error);
    }

    setUploading(false);
  };

  // Función para manejar el cambio de archivo al seleccionar una foto para subir
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  // Función para manejar la captura de una foto desde la cámara
  const handleCapturePhoto = async (photoDataUrl) => {
    setIsCameraModalOpen(false);

    // Convertir la foto a Blob
    const blobData = await fetch(photoDataUrl).then((res) => res.blob());

    // Subir la foto al almacenamiento (storage)
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, blobData);

    // Obtener la URL de la foto almacenada
    const photoURL = await getDownloadURL(storageRef);

    const infoPhoto = {
      url: photoURL,
      user: correoUsuario,
      likes: 0,
      comments: [],
      compartida: false,
    };

    try {
      await addDoc(collection(firestore, 'fotos'), {
        ...infoPhoto,
      });
    } catch (error) {
      console.log(error);
    }

    setUploading(false);
  };

  // Función para abrir el modal de la cámara
  const handleOpenCameraModal = (event) => {
    event.preventDefault(); // Evitar la recarga de la página
    setIsCameraModalOpen(true);
  };

  // Filtrar fotos compartidas y fotos del usuario
  const sharedPhotos = photos.filter((photo) => photo.compartida);
  const userPhotos = photos.filter((photo) => !photo.compartida);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <p className="title-welcome">
            Welcome , <strong>{correoUsuario}</strong> you are logged in
          </p>
        </div>
        <div className="col-md-4 text-end container-btn-cerrar-sesion">
          <button
            className="btn btn-cerrar-sesion"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-md-4">
          <h3 className="text-center mb-3">Start your trip</h3>
          <form>
            <div className="card card-body" style={{ border: "none" }}>
              <div className="form-group row">
                <div className="card mt-2 card-message-gallery">
                  <div className="card-body">
                    <p>We encourage you to share your photos with your friends. Every memory is a story.</p>
                  </div>
                </div>
                <button
                  className="btn mb-2 btn-take-photo-gallery"
                  onClick={handleOpenCameraModal}
                >
                  Take a photo
                </button>
                <label
                  htmlFor="fileInput"
                  className="btn mb-3 btn-upload-photo-gallery"
                >
                  Upload a photo
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-8">
          <h3 className="text-center mb-3">Community</h3>
          {sharedPhotos.map((photo) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              handleLike={handleLike}
              handleAddComment={handleAddComment}
              handleShare={handleShare}
              currentUser={correoUsuario}
            />
          ))}
          {userPhotos.map((photo) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              handleLike={handleLike}
              handleAddComment={handleAddComment}
              handleShare={handleShare}
            />
          ))}
        </div>
      </div>

      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={handleCapturePhoto}
      />
    </div>
  );
};

export default Gallery;

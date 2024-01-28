import React, { useState } from "react";

import imgPhotoTrip1 from "../images/viaje1.jpg";
import imgPhotoTrip2 from "../images/viaje2.jpg";
import imgPhotoTrip3 from "../images/viaje3.jpg";

import appFirebase from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const auth = getAuth(appFirebase);

const Authentication = () => {
  // Estado para controlar el modo de registro o inicio de sesión
  const [register, setRegister] = useState(false);

  // Función para manejar el inicio de sesión con Google
  const handlerGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
    }
  };

  // Función para manejar el envío del formulario
  const handlerSubmit = async(e)=>{
    e.preventDefault()
    const correo = e.target.email.value;
    const contraseña = e.target.contraseña.value

    if(register){
      try{
        // Crear una nueva cuenta de usuario
        await createUserWithEmailAndPassword(auth, correo, contraseña)
      }catch(error){
        console.error("Error de autenticación:", error.message);
      }
      
    }else{
      try{
        // Iniciar sesión con una cuenta existente
        await signInWithEmailAndPassword(auth, correo, contraseña)
      }catch(error){
        console.error("Error de autenticación:", error.message);
      }
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Título centrado */}
        <div className="col-12 text-center mb-4 title-auth">
          <h2>Biju</h2>
        </div>

        {/* Imágenes en la parte izquierda */}
        <div className="col-md-6">
          <div
            id="carouselExampleInterval"
            className="carousel slide carrusel-auth"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <img src={imgPhotoTrip1} alt="" className="w-100" />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img src={imgPhotoTrip2} alt="" className="w-100" />
              </div>
              <div className="carousel-item">
                <img src={imgPhotoTrip3} alt="" className="w-100" />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Formulario en la parte derecha */}
        <div className="col-md-4">
          <div className="mt-5 ms-5">
            <h1 className="title-register">{register ? " Sign up" : "Sign in"}</h1>
            <form onSubmit={handlerSubmit}>
              <div className="mb-3">
                <label className="form-label">Email: </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password: </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  id="contraseña"
                  required
                />
              </div>
              <button className="btn btn-register" type="submit">
                {register ? "Check in" : "Log in"}
              </button>
            </form>

            <button
              className="btn mt-4 btn-google"
              onClick={handlerGoogleLogin}
            >
              Sign in with Google
            </button>

            <div className="form-group">
              <button
                className="btn btn-block mt-4"
                onClick={() => setRegister(!register)}
              >
                {register
                  ? "¿Already have an account?, log in"
                  : "¿Don't have an account?, register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

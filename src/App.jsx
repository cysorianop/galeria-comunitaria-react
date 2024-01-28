import Gallery from "./components/Gallery";
import Authentication from "./components/Authentication";
import React, { useEffect, useState } from "react";
import appFirebase from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(appFirebase);

function App() {
  const [user, setUser] = useState(null);
const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userChanged) => {
      if (userChanged) {
        setUser(userChanged);
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (authLoading) {
    // Muestra el indicador de carga mientras se verifica el estado de autenticación
    return <div className="loader-container">Cargando...</div>;
  }
  return <div className="">{user ? <Gallery correoUsuario = {user.email} /> : <Authentication />}</div>;
}

export default App;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsXuCyLIbhw0pfhSTQK7mqItXRAzYDE2E",
  authDomain: "galeria-comunitaria.firebaseapp.com",
  projectId: "galeria-comunitaria",
  storageBucket: "galeria-comunitaria.appspot.com",
  messagingSenderId: "289829225277",
  appId: "1:289829225277:web:a19394da1671c9ab357b54",
  measurementId: "G-0LP3879FL6"
};

const appFirebase = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const firestore = getFirestore(app);
// export const storage = getStorage(app);
// export const analytics = getAnalytics(app);

export default appFirebase;


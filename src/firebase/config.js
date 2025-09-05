import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Your web app's Firebase configuration (LA CORRECTA)
const firebaseConfig = {
  apiKey: "AIzaSyAoab1Yon1Bz7rAPPzMZdv2au_4Crtva5Y",
  authDomain: "calendario-grupo-bolivar-cfdd4.firebaseapp.com",
  projectId: "calendario-grupo-bolivar-cfdd4",
  storageBucket: "calendario-grupo-bolivar-cfdd4.firebasestorage.app",
  messagingSenderId: "326460609543",
  appId: "1:326460609543:web:2bdf381448a050899286a2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportamos los servicios que usamos en la app
export const db = getFirestore(app);
export const auth = getAuth(app);

// Función para iniciar sesión con Google
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .catch((error) => {
      console.error("Error al iniciar sesión con Google:", error);
    });
};

// Función para cerrar sesión
export const signOutUser = () => {
  signOut(auth).catch((error) => {
    console.error("Error al cerrar sesión:", error);
  });
};
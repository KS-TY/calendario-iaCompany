import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase que ya tenías
const firebaseConfig = {
  apiKey: "AIzaSyAoab1Yon1Bz7rAPPzMZdv2au_4Crtva5Y",
  authDomain: "calendario-grupo-bolivar-cfdd4.firebaseapp.com",
  projectId: "calendario-grupo-bolivar-cfdd4",
  storageBucket: "calendario-grupo-bolivar-cfdd4.firebasestorage.app",
  messagingSenderId: "326460609543",
  appId: "1:326460609543:web:2bdf381448a050899286a2"
};

// Inicializamos la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la instancia de la base de datos de Firestore
// para que podamos usarla en otros archivos.
export const db = getFirestore(app);
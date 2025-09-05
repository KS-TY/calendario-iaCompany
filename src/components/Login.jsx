import React from 'react';
import { signInWithGoogle } from '../firebase/config.js'; // Importamos la función de login

function Login() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center'
    }}>
      <h1>Bienvenido al Calendario IA Company</h1>
      <p>Por favor, inicia sesión para continuar.</p>
      <button 
        className="calendar-toggle-btn" 
        style={{fontSize: '1rem'}} 
        onClick={signInWithGoogle}
      >
        Iniciar Sesión con Google
      </button>
    </div>
  );
}

export default Login;
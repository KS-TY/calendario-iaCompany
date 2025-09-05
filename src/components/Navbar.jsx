import React from 'react';
import { signOutUser } from '../firebase/config.js'; // Importamos la función de cerrar sesión

// El Navbar ahora recibe al "usuario" como un prop
function Navbar({ user }) {
  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="navbar-brand">
        <h1>
          <img 
            src="/Grupo-bolivar.png.webp" 
            alt="Logo Grupo Bolívar" 
            style={{ width: '150px', height: '80px', verticalAlign: 'middle', marginRight: '8px' }} 
          />
          Reto Grupo Bolívar
        </h1>
      </div>
      
      {/* Mostramos la info del usuario y el botón de salir si el usuario existe */}
      {user && (
        <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={user.photoURL} alt={user.displayName} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          <span style={{ fontWeight: '500' }}>{user.displayName}</span>
          <button 
            onClick={signOutUser} 
            style={{
              background: 'rgba(255, 0, 0, 0.2)',
              border: '1px solid red',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
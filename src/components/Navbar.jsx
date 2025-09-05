import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>
        <img 
          src="/Grupo-bolivar.png.webp" 
          alt="Logo Grupo Bolívar" 
          style={{
            width: '150px', 
            height: '80px', 
            verticalAlign: 'middle', 
            marginRight: '8px'
          }} 
        />
        Reto IA company
      </h1>
    </nav>
  );
}

export default Navbar;
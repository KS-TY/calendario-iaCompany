import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Nuestros nuevos estilos
import './styles/main.css'
import './styles/components/navbar.css'
import './styles/components/header.css'
import './styles/components/calendar.css'
import './styles/components/comments.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
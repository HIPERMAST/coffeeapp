import React, { useState } from 'react';
import './App.css';
import Login from './Components/Login/login';
import CoffeeShop from './Components/CoffeeShop/coffeeShop';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

function App() {
  // Estado para almacenar el role después de la autenticación
  const [role, setRole] = useState('');

  // Función para actualizar el role después de la autenticación exitosa
  const actualizarRole = (nuevoRole) => {
    setRole(nuevoRole);
  };

  // Renderizar el componente Login si el role no está definido, de lo contrario, renderizar la CoffeeShop
  return (
    <Router>
      <div className="App">
        <Routes>
          {!role ? (
            <Route path="/" element={<Navigate to="/login" />} />
          ) : (
            <Route path="/login" element={<Navigate to="/coffeeshop" />} />
          )}
          <Route path="/login" element={<Login actualizarRole={actualizarRole} />} />
          <Route path="/coffeeshop" element={<CoffeeShop role={role} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

/**
 * APLICACIÓN PRINCIPAL - CON NAVEGACIÓN
 */

import { useState } from 'react';
import Login from './components/auth/Login';
import Layout from './components/layout/Layout';
import PanelVentas from './components/ventas/PanelVentas';
import PanelAdmin from './components/admin/PanelAdmin';
import PanelProductos from './components/productos/PanelProductos';
import { ProductoProvider } from './contexts/ProductoContext';
import { RegistroProvider } from './contexts/RegistroContext';
import HistorialDiario from './components/historial/HistorialDiario';
import './styles/global.css';

function App() {
  const [usuario, setUsuario] = useState({ 
    email: 'admin@danbri.com', 
    nombre: 'Administrador', 
    rol: 'admin' 
  });

  const [vistaActual, setVistaActual] = useState('ventas');

  const handleLogin = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const handleLogout = () => {
    if (confirm('¿Seguro que quieres salir?')) {
      setUsuario(null);
    }
  };

  if (!usuario) {
    return <Login onLogin={handleLogin} />;
  }

 const renderizarVista = () => {
  switch (vistaActual) {
    case 'ventas':
      return <PanelVentas />;
    case 'admin':
      return <PanelAdmin />;
    case 'productos':
      return <PanelProductos />;
    case 'historial':  // 🔥 NUEVO
      return <HistorialDiario />;
    default:
      return <PanelVentas />;
  }
};

  return (
  <ProductoProvider>
    <RegistroProvider>  {/* 🔥 NUEVO - ABRE */}
      <Layout 
        usuario={usuario} 
        onLogout={handleLogout}
        vistaActual={vistaActual}
        onCambiarVista={setVistaActual}
      >
        {renderizarVista()}
      </Layout>
    </RegistroProvider>  {/* 🔥 NUEVO - CIERRA */}
  </ProductoProvider>
);
}

export default App;
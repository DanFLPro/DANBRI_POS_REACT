/**
 * ============================================
 * APP.JSX - PUNTO DE ENTRADA PRINCIPAL
 * ============================================
 * 
 * 📌 ¿QUÉ HACE ESTE ARCHIVO?
 * ---------------------------------------------
 * Es el componente raíz de toda la aplicación.
 * Decide qué pantalla mostrar según si hay 
 * usuario logueado o no.
 * 
 * 🎯 FLUJO DE LA APLICACIÓN:
 * ---------------------------------------------
 * 1. Si NO hay usuario → Muestra Login
 * 2. Si SÍ hay usuario → Muestra el POS (Layout + contenido)
 * 
 * 🔧 CÓMO MODIFICARLO:
 * ---------------------------------------------
 * 1. Cambiar usuario por defecto: Modificar la línea 20
 * 2. Cambiar credenciales de prueba: Ir a Login.jsx
 * 3. Agregar más secciones: Agregar componentes dentro del Layout
 * ============================================
 */

import { useState } from 'react';
import Login from './components/auth/Login';
import Layout from './components/layout/Layout';
import PanelVentas from './components/ventas/PanelVentas';
import PanelAdmin from './components/admin/PanelAdmin';
import './styles/global.css';

function App() {
  // ============================================
  // ESTADO DEL USUARIO
  // ============================================
  // 🔥 MODO DESARROLLO: Usuario por defecto para ver el POS sin login
  // Para volver al login normal, comenta esta línea y descomenta la de abajo
  const [usuario, setUsuario] = useState({ 
    email: 'admin@danbri.com', 
    nombre: 'Administrador', 
    rol: 'admin' 
  });
  
  // const [usuario, setUsuario] = useState(null); // ← Descomenta esta línea para usar login

  // ============================================
  // FUNCIONES DE AUTENTICACIÓN
  // ============================================
  
  /**
   * handleLogin - Se ejecuta cuando el usuario inicia sesión
   * @param {Object} datosUsuario - Datos del usuario logueado
   */
  const handleLogin = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  /**
   * handleLogout - Se ejecuta cuando el usuario cierra sesión
   * Pide confirmación antes de salir
   */
  const handleLogout = () => {
    if (confirm('¿Seguro que quieres salir?')) {
      setUsuario(null);
    }
  };

  // ============================================
  // RENDERIZADO CONDICIONAL
  // ============================================
  
  // Si no hay usuario, mostrar la pantalla de Login
  if (!usuario) {
    return <Login onLogin={handleLogin} />;
  }

  // Si hay usuario, mostrar el POS completo
  return (
    <Layout usuario={usuario} onLogout={handleLogout}>
      {/* Contenido principal: Panel de Ventas */}
      <PanelVentas />
      
      {/* Panel de Administrador (solo visible para admin) */}
      {usuario.rol === 'admin' && <PanelAdmin />}
    </Layout>
  );
}

export default App;
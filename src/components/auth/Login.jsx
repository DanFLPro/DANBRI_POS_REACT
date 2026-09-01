/**
 * ============================================
 * PANTALLA DE LOGIN - VERSIÓN MÓVIL
 * ============================================
 * 
 * 📌 ¿QUÉ HACE ESTE COMPONENTE?
 * ---------------------------------------------
 * Pantalla de inicio de sesión del POS.
 * Permite al usuario ingresar con email y contraseña.
 * 
 * 🎯 CARACTERÍSTICAS:
 * ---------------------------------------------
 * ✅ Diseño optimizado para móvil
 * ✅ Validación de campos
 * ✅ Mensajes de error claros
 * ✅ Credenciales de prueba visibles
 * 
 * 🔧 CÓMO MODIFICARLO:
 * ---------------------------------------------
 * 1. Cambiar credenciales: Modificar los if en el setTimeout
 * 2. Cambiar diseño: Modificar los estilos inline
 * 3. Agregar "recordar contraseña": Añadir un checkbox
 * 4. Cambiar mensajes: Modificar los textos
 * ============================================
 */

import { useState } from 'react';
import Input from '../common/Input';
import Boton from '../common/Boton';

const Login = ({ onLogin }) => {
  // ============================================
  // ESTADO LOCAL
  // ============================================
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  // ============================================
  // FUNCIÓN DE LOGIN
  // ============================================
  
  /**
   * handleSubmit - Maneja el envío del formulario
   * @param {Event} e - Evento del formulario
   * 
   * CREDENCIALES DE PRUEBA:
   * Admin: admin@danbri.com / Admin123!
   * Vendedor: daniel@danbri.com / Daniel123!
   * Vendedor: carlos@danbri.com / Carlos123!
   * Vendedor: maria@danbri.com / Maria123!
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación: campos vacíos
    if (!email || !password) {
      setError('Completa todos los campos');
      return;
    }

    setCargando(true);

    // Simulación de autenticación (después será Firebase Auth)
    setTimeout(() => {
      // === CREDENCIALES DE PRUEBA ===
      if (email === 'admin@danbri.com' && password === 'Admin123!') {
        onLogin({ 
          email, 
          nombre: 'Administrador', 
          rol: 'admin' 
        });
      } 
      else if (email === 'daniel@danbri.com' && password === 'Daniel123!') {
        onLogin({ 
          email, 
          nombre: 'Daniel', 
          rol: 'vendedor' 
        });
      } 
      else if (email === 'carlos@danbri.com' && password === 'Carlos123!') {
        onLogin({ 
          email, 
          nombre: 'Carlos', 
          rol: 'vendedor' 
        });
      } 
      else if (email === 'maria@danbri.com' && password === 'Maria123!') {
        onLogin({ 
          email, 
          nombre: 'María', 
          rol: 'vendedor' 
        });
      } 
      else {
        setError('Email o contraseña incorrectos');
      }
      
      setCargando(false);
    }, 800); // Simula un delay de red
  };

  // ============================================
  // RENDERIZADO
  // ============================================
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f0f0f',
      padding: '20px'
    }}>
      {/* Tarjeta de Login */}
      <div style={{
        background: '#1a1a1a',
        borderRadius: '24px',
        padding: '32px 24px',
        maxWidth: '400px',
        width: '100%',
        border: '1px solid #2a2a2a',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)'
      }}>
        
        {/* ======================================== */}
        {/* LOGO Y TÍTULO                            */}
        {/* ======================================== */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img 
            src="imag/LogoDanbri.png" 
            alt="Danbri" 
            style={{ width: '160px', margin: '0 auto 12px' }}
             onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Ctext y="55" font-size="50" font-weight="bold" text-anchor="middle" fill="%23FF6B00"%3ED%3C/text%3E%3C/svg%3E';
        }}
/>
          
          <h1 style={{ 
            color: '#ff6b00', 
            fontSize: '24px', 
            margin: 0,
            fontWeight: 'bold'
          }}>
            Danbri POS
          </h1>
          <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>
            Punto de Venta
          </p>
        </div>

        {/* ======================================== */}
        {/* FORMULARIO                               */}
        {/* ======================================== */}
        <form onSubmit={handleSubmit}>
          {/* Campo Email */}
          <Input
            label="Email"
            tipo="email"
            placeholder="correo@ejemplo.com"
            valor={email}
            onChange={setEmail}
            icono="📧"
            requerido
          />

          {/* Campo Contraseña */}
          <div style={{ marginTop: '16px' }}>
            <Input
              label="Contraseña"
              tipo="password"
              placeholder="••••••••"
              valor={password}
              onChange={setPassword}
              icono="🔒"
              requerido
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: 'rgba(255, 71, 87, 0.1)',
              borderRadius: '10px',
              color: '#ff4757',
              fontSize: '14px',
              border: '1px solid rgba(255, 71, 87, 0.2)'
            }}>
              ❌ {error}
            </div>
          )}

          {/* Botón de Ingresar */}
          <div style={{ marginTop: '24px' }}>
            <Boton
              tipo="submit"
              variante="primary"
              tamaño="lg"
              anchoCompleto
              cargando={cargando}
              icono="🔐"
            >
              {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
            </Boton>
          </div>

          {/* ======================================== */}
          {/* CREDENCIALES DE PRUEBA                   */}
          {/* ======================================== */}
          <div style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid #2a2a2a',
            textAlign: 'center'
          }}>
            <p style={{ color: '#666', fontSize: '11px', margin: '0 0 4px' }}>
              🔑 Credenciales de prueba
            </p>
            <div style={{ fontSize: '10px', color: '#555', lineHeight: '1.6' }}>
              <div>Admin: admin@danbri.com / Admin123!</div>
              <div>Vendedor: daniel@danbri.com / Daniel123!</div>
              <div>Vendedor: carlos@danbri.com / Carlos123!</div>
              <div>Vendedor: maria@danbri.com / Maria123!</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
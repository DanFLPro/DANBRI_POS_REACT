/**
 * ============================================
 * LAYOUT PRINCIPAL - VERSIÓN MÓVIL
 * ============================================
 * 
 * 📌 ¿QUÉ HACE ESTE COMPONENTE?
 * ---------------------------------------------
 * Este es el "esqueleto" de toda la aplicación.
 * Define la estructura visual que se repite en 
 * todas las pantallas del POS.
 * 
 * 🎯 CARACTERÍSTICAS:
 * ---------------------------------------------
 * ✅ Header superior con logo y usuario
 * ✅ Menú inferior estilo app móvil (con 3 botones)
 * ✅ Espacio para el contenido principal
 * ✅ Adaptado para pantallas táctiles
 * 
 * 🧩 PROPS QUE RECIBE:
 * ---------------------------------------------
 * - children: Contenido que va en el centro
 * - usuario: Datos del usuario logueado
 * - onLogout: Función para cerrar sesión
 * 
 * 🔧 CÓMO MODIFICARLO:
 * ---------------------------------------------
 * 1. Cambiar colores: Buscar '#ff6b00' o '#1a1a1a'
 * 2. Agregar más botones al menú: Agregar un <button> en el nav
 * 3. Cambiar tamaño del logo: Modificar el width en el <img>
 * 4. Cambiar espaciado: Modificar los valores de padding/margin
 * ============================================
 */

import { useState } from 'react';

const Layout = ({ children, usuario, onLogout }) => {
  // Estado para controlar si el menú está abierto (por si después hacemos un menú hamburguesa)
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',          // Ocupa toda la pantalla
      background: '#0f0f0f',       // Fondo negro profundo
      paddingBottom: '80px',       // Espacio para el menú inferior
      position: 'relative'
    }}>
      
      {/* ======================================== */}
      {/* HEADER SUPERIOR (Barra fija arriba)     */}
      {/* ======================================== */}
      <header style={{
        background: '#1a1a1a',      // Fondo gris oscuro
        padding: '12px 16px',       // Espaciado interno
        borderBottom: '1px solid #2a2a2a', // Línea separadora
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',         // Se queda fijo al hacer scroll
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)' // Efecto vidrio
      }}>
        
        {/* LOGO + NOMBRE DEL SISTEMA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="imag/LogoDanbri.png" 
            alt="Danbri" 
            style={{ width: '36px', height: '36px', borderRadius: '8px' }}
            onError={(e) => {
              // Si no carga la imagen, muestra un emoji
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"%3E%3Ctext y="26" font-size="24" text-anchor="middle"%3E🏪%3C/text%3E%3C/svg%3E';
            }}
          />
          <span style={{ 
            color: '#ff6b00',        // Color naranja
            fontWeight: 'bold', 
            fontSize: '18px' 
          }}>
            Danbri POS
          </span>
          
          {/* Badge "Admin" solo si el usuario es administrador */}
          {usuario?.rol === 'admin' && (
            <span style={{
              background: 'rgba(255, 107, 0, 0.2)',
              color: '#ff6b00',
              fontSize: '10px',
              padding: '2px 8px',
              borderRadius: '12px',
              fontWeight: 'bold'
            }}>
              Admin
            </span>
          )}
        </div>
        
        {/* INFORMACIÓN DEL USUARIO + BOTÓN SALIR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            color: '#888', 
            fontSize: '12px',
            textAlign: 'right',
            lineHeight: '1.3'
          }}>
            <div style={{ color: 'white' }}>{usuario?.nombre || 'Usuario'}</div>
            <div style={{ fontSize: '10px' }}>{usuario?.email}</div>
          </div>
          
          {/* Botón de salir con emoji de puerta */}
          <button
            onClick={onLogout}
            style={{
              background: 'rgba(255, 71, 87, 0.15)',
              color: '#ff4757',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            🚪
          </button>
        </div>
      </header>

      {/* ======================================== */}
      {/* CONTENIDO PRINCIPAL                      */}
      {/* ======================================== */}
      <main style={{
        padding: '16px',           // Espaciado alrededor
        maxWidth: '480px',         // Ancho máximo (como una app móvil)
        margin: '0 auto'           // Centrado
      }}>
        {children}  {/* Aquí se renderiza lo que pongamos dentro del Layout */}
      </main>

      {/* ======================================== */}
      {/* MENÚ INFERIOR (Estilo app móvil)        */}
      {/* ======================================== */}
      <nav style={{
        position: 'fixed',          // Fijo abajo
        bottom: 0,
        left: 0,
        right: 0,
        background: '#1a1a1a',
        borderTop: '1px solid #2a2a2a',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        paddingBottom: 'env(safe-area-inset-bottom)', // Para iPhone con notch
        zIndex: 100
      }}>
        
        {/* BOTÓN 1: VENTAS (Activo por defecto) */}
        <button style={{
          background: 'transparent',
          border: 'none',
          color: '#ff6b00',          // Color naranja = activo
          padding: '8px 16px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          fontSize: '20px',
          cursor: 'pointer'
        }}>
          <span>📊</span>
          <span style={{ fontSize: '10px', color: '#ff6b00' }}>Ventas</span>
        </button>
        
        {/* BOTÓN 2: REPORTES (Inactivo) */}
        <button style={{
          background: 'transparent',
          border: 'none',
          color: '#666',            // Color gris = inactivo
          padding: '8px 16px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          fontSize: '20px',
          cursor: 'pointer'
        }}>
          <span>📈</span>
          <span style={{ fontSize: '10px', color: '#666' }}>Reportes</span>
        </button>
        
        {/* BOTÓN 3: ADMIN (Solo visible para administradores) */}
        {usuario?.rol === 'admin' && (
          <button style={{
            background: 'transparent',
            border: 'none',
            color: '#666',
            padding: '8px 16px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            fontSize: '20px',
            cursor: 'pointer'
          }}>
            <span>⚙️</span>
            <span style={{ fontSize: '10px', color: '#666' }}>Admin</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Layout;
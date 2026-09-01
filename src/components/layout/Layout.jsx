/**
 * LAYOUT PRINCIPAL - CON NAVEGACIÓN
 */

import { useState } from 'react';

const Layout = ({ children, usuario, onLogout, vistaActual, onCambiarVista }) => {

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      paddingBottom: '80px',
      position: 'relative',
      color: 'var(--text-primary)',
      transition: 'background 0.3s, color 0.3s'
    }}>
      <header style={{
        background: 'var(--bg-secondary)',
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'background 0.3s, border-color 0.3s'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="imag/LogoDanbri.png" 
            alt="Danbri" 
            style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'contain' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"%3E%3Ctext y="26" font-size="24" text-anchor="middle" fill="%23FF6B00"%3ED%3C/text%3E%3C/svg%3E';
            }}
          />
          <span style={{ 
            color: 'var(--color-primary)', 
            fontWeight: 'bold', 
            fontSize: '18px' 
          }}>
            Danbri POS
          </span>
          {usuario?.rol === 'admin' && (
            <span style={{
              background: 'rgba(255, 107, 0, 0.2)',
              color: 'var(--color-primary)',
              fontSize: '10px',
              padding: '2px 8px',
              borderRadius: '12px',
              fontWeight: 'bold'
            }}>
              Admin
            </span>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            color: 'var(--text-muted)', 
            fontSize: '12px',
            textAlign: 'right',
            lineHeight: '1.3'
          }}>
            <div style={{ color: 'var(--text-primary)' }}>{usuario?.nombre || 'Usuario'}</div>
            <div style={{ fontSize: '10px' }}>{usuario?.email}</div>
          </div>
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

      <main style={{
        padding: '16px',
        maxWidth: '480px',
        margin: '0 auto'
      }}>
        {children}
      </main>

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        paddingBottom: 'env(safe-area-inset-bottom)',
        zIndex: 100,
        transition: 'background 0.3s, border-color 0.3s'
      }}>
        <button
          onClick={() => onCambiarVista('ventas')}
          style={{
            background: 'transparent',
            border: 'none',
            color: vistaActual === 'ventas' ? 'var(--color-primary)' : 'var(--text-muted)',
            padding: '8px 16px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          <span>📊</span>
          <span style={{ 
            fontSize: '10px', 
            color: vistaActual === 'ventas' ? 'var(--color-primary)' : 'var(--text-muted)' 
          }}>
            Ventas
          </span>
        </button>
        
        <button
          onClick={() => onCambiarVista('productos')}
          style={{
            background: 'transparent',
            border: 'none',
            color: vistaActual === 'productos' ? 'var(--color-primary)' : 'var(--text-muted)',
            padding: '8px 16px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          <span>🏷️</span>
          <span style={{ 
            fontSize: '10px', 
            color: vistaActual === 'productos' ? 'var(--color-primary)' : 'var(--text-muted)' 
          }}>
            Productos
          </span>
        </button>
        
        <button
          onClick={() => onCambiarVista('admin')}
          style={{
            background: 'transparent',
            border: 'none',
            color: vistaActual === 'admin' ? 'var(--color-primary)' : 'var(--text-muted)',
            padding: '8px 16px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          <span>⚙️</span>
          <span style={{ 
            fontSize: '10px', 
            color: vistaActual === 'admin' ? 'var(--color-primary)' : 'var(--text-muted)' 
          }}>
            Admin
          </span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
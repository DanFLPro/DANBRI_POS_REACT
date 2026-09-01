/**
 * ============================================
 * TOAST - NOTIFICACIONES EMERGENTES
 * ============================================
 * Muestra mensajes de confirmación/error/aviso
 * 
 * 📌 USO:
 * <Toast mensaje="Venta registrada" tipo="success" />
 * 
 * 🎯 TIPOS:
 * - success: Verde (éxito)
 * - error: Rojo (error)
 * - warning: Amarillo (advertencia)
 * - info: Azul (información)
 */

import { useEffect, useState } from 'react';

const Toast = ({ mensaje, tipo = 'success', duracion = 3000, onCerrar }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onCerrar) onCerrar();
    }, duracion);
    return () => clearTimeout(timer);
  }, [duracion, onCerrar]);

  if (!visible) return null;

  const colores = {
    success: { bg: '#22c55e', icono: '✅' },
    error: { bg: '#ef4444', icono: '❌' },
    warning: { bg: '#f59e0b', icono: '⚠️' },
    info: { bg: '#3b82f6', icono: 'ℹ️' }
  };

  const estilo = colores[tipo] || colores.success;

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: estilo.bg,
      color: 'white',
      padding: '14px 24px',
      borderRadius: '12px',
      zIndex: 9999,
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      fontWeight: 'bold',
      maxWidth: '90%',
      textAlign: 'center',
      animation: 'slideDown 0.3s ease-out',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <span style={{ fontSize: '20px' }}>{estilo.icono}</span>
      <span>{mensaje}</span>
      <button
        onClick={() => {
          setVisible(false);
          if (onCerrar) onCerrar();
        }}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '18px',
          cursor: 'pointer',
          opacity: 0.7,
          padding: '0 4px'
        }}
      >
        ✕
      </button>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
/**
 * ============================================
 * PANEL DE VENTAS - CON BUSCADOR Y REPORTES
 * ============================================
 */

import { useState } from 'react';
import Toast from '../common/Toast';
import BuscadorVentas from './BuscadorVentas';
import ReporteVentas from './ReporteVentas';

const PanelVentas = () => {
  const [ventas, setVentas] = useState([
    { id: 1, monto: 150.00, descripcion: 'Producto A', fecha: '01/09/2026', hora: '14:30', vendedor: 'Daniel', vendedorNombre: 'Daniel' },
    { id: 2, monto: 75.50, descripcion: 'Producto B', fecha: '01/09/2026', hora: '15:45', vendedor: 'Daniel', vendedorNombre: 'Daniel' },
  ]);
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cargando, setCargando] = useState(false);
  const [toast, setToast] = useState(null);
  const [ventasFiltradas, setVentasFiltradas] = useState(ventas);

  const total = ventas.reduce((sum, v) => sum + v.monto, 0);

  const mostrarToast = (mensaje, tipo = 'success') => {
    setToast({ mensaje, tipo });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRegistrar = (e) => {
    e.preventDefault();
    if (!monto || parseFloat(monto) <= 0) {
      mostrarToast('⚠️ Ingresa un monto válido', 'warning');
      return;
    }

    setCargando(true);
    setTimeout(() => {
      const nuevaVenta = {
        id: Date.now(),
        monto: parseFloat(monto),
        descripcion: descripcion || 'Venta',
        fecha: new Date().toLocaleDateString('es-PE'),
        hora: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
        vendedor: 'Daniel',
        vendedorNombre: 'Daniel'
      };
      setVentas([nuevaVenta, ...ventas]);
      setVentasFiltradas([nuevaVenta, ...ventas]);
      setMonto('');
      setDescripcion('');
      setCargando(false);
      mostrarToast('✅ Venta registrada correctamente', 'success');
    }, 500);
  };

  const handleEliminar = (id) => {
    if (confirm('¿Estás seguro de eliminar esta venta?')) {
      setVentas(ventas.filter(v => v.id !== id));
      setVentasFiltradas(ventasFiltradas.filter(v => v.id !== id));
      mostrarToast('🗑️ Venta eliminada', 'error');
    }
  };

  return (
    <div>
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} />}

      {/* Reporte de Ventas */}
      <ReporteVentas ventas={ventas} />

      {/* Estadísticas rápidas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          padding: '16px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>💰 Total</div>
          <div style={{ 
            color: 'var(--color-primary)', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginTop: '4px'
          }}>
            S/ {total.toFixed(2)}
          </div>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          padding: '16px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>📋 Ventas</div>
          <div style={{ 
            color: '#00b4d8', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginTop: '4px'
          }}>
            {ventas.length}
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div style={{
        background: 'var(--bg-card)',
        padding: '20px',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        marginBottom: '20px'
      }}>
        <h3 style={{
          color: 'var(--color-primary)',
          fontSize: '16px',
          margin: '0 0 16px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          📝 Nueva Venta
        </h3>

        <form onSubmit={handleRegistrar}>
          <input
            type="number"
            placeholder="Monto (S/)"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box',
              marginBottom: '12px'
            }}
            step="0.01"
            min="0.01"
            required
          />
          <input
            type="text"
            placeholder="Descripción (opcional)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box',
              marginBottom: '16px'
            }}
          />
          <button
            type="submit"
            disabled={cargando}
            style={{
              width: '100%',
              padding: '14px',
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              opacity: cargando ? 0.6 : 1,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!cargando) e.target.style.background = 'var(--color-primary-dark)';
            }}
            onMouseLeave={(e) => {
              if (!cargando) e.target.style.background = 'var(--color-primary)';
            }}
          >
            {cargando ? '⏳ Registrando...' : '➕ Registrar Venta'}
          </button>
        </form>
      </div>

      {/* Buscador y Lista */}
      <div style={{
        background: 'var(--bg-card)',
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{
          color: 'var(--text-primary)',
          fontSize: '16px',
          margin: '0 0 16px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>📊 Últimas Ventas</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 'normal' }}>
            {ventas.length} ventas
          </span>
        </h3>

        <BuscadorVentas ventas={ventas} onFiltrar={setVentasFiltradas} />

        {ventasFiltradas.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: 'var(--text-muted)', 
            padding: '32px 0',
            fontSize: '14px'
          }}>
            No hay ventas para mostrar
          </div>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {ventasFiltradas.map((venta) => (
              <div key={venta.id} style={{
                padding: '14px 16px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--bg-card-hover)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    color: 'var(--color-primary)',
                    fontSize: '18px'
                  }}>
                    S/ {venta.monto.toFixed(2)}
                  </div>
                  <div style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {venta.descripcion}
                  </div>
                  <div style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: '11px',
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}>
                    <span>📅 {venta.fecha}</span>
                    <span>⏰ {venta.hora}</span>
                    <span>👤 {venta.vendedorNombre || venta.vendedor}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleEliminar(venta.id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#ef4444',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelVentas;
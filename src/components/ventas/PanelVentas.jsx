/**
 * ============================================
 * PANEL DE VENTAS - CON REGISTRO DIARIO
 * ============================================
 */

import { useState } from 'react';
import Toast from '../common/Toast';
import BuscadorVentas from './BuscadorVentas';
import ReporteVentas from './ReporteVentas';
// 🔥 IMPORTAR EL CONTEXTO DE REGISTRO
import { useRegistro } from '../../contexts/RegistroContext';

const PanelVentas = () => {
  // 🔥 OBTENER LA FUNCIÓN PARA GUARDAR REGISTROS
  const { agregarRegistro } = useRegistro();

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
      
      // Guardar en el estado local (para mostrar en la lista)
      setVentas([nuevaVenta, ...ventas]);
      setVentasFiltradas([nuevaVenta, ...ventas]);
      
      // 🔥 GUARDAR EN EL REGISTRO DIARIO (para el historial y exportar)
      agregarRegistro(nuevaVenta);
      
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
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">💰 Total</div>
          <div className="stat-value primary">S/ {total.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📋 Ventas</div>
          <div className="stat-value info">{ventas.length}</div>
        </div>
      </div>

      {/* Formulario */}
      {/* Formulario */}
<div className="card" style={{
  background: 'var(--bg-card)',
  border: '2px solid var(--color-primary)',
  boxShadow: '0 0 20px rgba(255, 107, 0, 0.05)'
}}>
  <h3 className="card-title" style={{ 
    color: 'var(--color-primary)', 
    marginBottom: '14px',
    fontSize: '18px'
  }}>
    📝 Nueva Venta
  </h3>
  <form onSubmit={handleRegistrar}>
    <div style={{ marginBottom: '12px' }}>
      <label style={{ 
        fontSize: '13px', 
        color: 'var(--text-secondary)',
        fontWeight: '500',
        display: 'block',
        marginBottom: '4px'
      }}>
        💰 Monto (S/)
      </label>
      <input
        type="number"
        className="input"
        placeholder="0.00"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        step="0.01"
        min="0.01"
        required
      />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <label style={{ 
        fontSize: '13px', 
        color: 'var(--text-secondary)',
        fontWeight: '500',
        display: 'block',
        marginBottom: '4px'
      }}>
        📝 Descripción (opcional)
      </label>
      <input
        type="text"
        className="input"
        placeholder="¿Qué vendiste?"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
    </div>
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={cargando}
      style={{ 
        opacity: cargando ? 0.6 : 1,
        fontSize: '16px',
        fontWeight: '700'
      }}
    >
      {cargando ? '⏳ Registrando...' : '➕ Registrar Venta'}
    </button>
  </form>
</div>

      {/* Buscador y Lista */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📊 Últimas Ventas</h3>
          <span className="card-subtitle">{ventas.length} ventas</span>
        </div>

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
              <div key={venta.id} className="venta-item">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="venta-monto">S/ {venta.monto.toFixed(2)}</div>
                  <div className="venta-descripcion">{venta.descripcion}</div>
                  <div className="venta-detalle">
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
/**
 * ============================================
 * PANEL DE ADMINISTRADOR - CIERRE DE DÍA
 * ============================================
 */

import { useState } from 'react';

const PanelAdmin = ({ ventas, onCerrarDia, onVerHistorial }) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [cierres, setCierres] = useState([]);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [resumenDia, setResumenDia] = useState(null);

  const calcularResumenDia = () => {
    const hoy = new Date().toLocaleDateString('es-PE');
    const ventasHoy = ventas.filter(v => v.fecha === hoy);
    const total = ventasHoy.reduce((sum, v) => sum + v.monto, 0);
    
    const porVendedor = ventasHoy.reduce((acc, v) => {
      const nombre = v.vendedorNombre || v.vendedor || 'Desconocido';
      acc[nombre] = (acc[nombre] || 0) + v.monto;
      return acc;
    }, {});

    return { 
      fecha: hoy, 
      total, 
      cantidad: ventasHoy.length, 
      porVendedor,
      ventas: ventasHoy
    };
  };

  const handleCerrarDia = () => {
    const resumen = calcularResumenDia();
    if (resumen.cantidad === 0) {
      alert('No hay ventas para cerrar hoy');
      return;
    }
    setResumenDia(resumen);
    setMostrarConfirmacion(true);
  };

  const handleConfirmarCierre = () => {
    const nuevoCierre = {
      id: Date.now(),
      fecha: resumenDia.fecha,
      total: resumenDia.total,
      ventas: resumenDia.cantidad,
      detalle: resumenDia.porVendedor,
      timestamp: Date.now()
    };
    
    setCierres([nuevoCierre, ...cierres]);
    setMostrarConfirmacion(false);
    
    if (onCerrarDia) {
      onCerrarDia(resumenDia.fecha);
    }
    
    alert(`✅ Día ${resumenDia.fecha} cerrado. Total: S/ ${resumenDia.total.toFixed(2)}`);
    setResumenDia(null);
  };

  const handleVerHistorial = () => {
    setMostrarHistorial(!mostrarHistorial);
  };

  const totalGeneral = cierres.reduce((sum, c) => sum + c.total, 0);

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Modal de confirmación */}
      {mostrarConfirmacion && resumenDia && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9998,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            padding: '24px',
            borderRadius: '16px',
            maxWidth: '400px',
            width: '100%',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
              📆 Cerrar Día
            </h3>
            <div style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              <p><strong>📅 Fecha:</strong> {resumenDia.fecha}</p>
              <p><strong>💰 Total:</strong> S/ {resumenDia.total.toFixed(2)}</p>
              <p><strong>🧾 Ventas:</strong> {resumenDia.cantidad}</p>
              <div style={{ marginTop: '8px' }}>
                <strong>👤 Por vendedor:</strong>
                {Object.entries(resumenDia.porVendedor).map(([nombre, total]) => (
                  <div key={nombre} style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {nombre}: S/ {total.toFixed(2)}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleConfirmarCierre}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                ✅ Confirmar
              </button>
              <button
                onClick={() => {
                  setMostrarConfirmacion(false);
                  setResumenDia(null);
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'var(--bg-input)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Panel Admin */}
      <div style={{
        background: 'var(--bg-card)',
        padding: '20px',
        borderRadius: '16px',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{
          color: 'var(--text-primary)',
          fontSize: '16px',
          margin: '0 0 16px 0'
        }}>
          🛠️ Panel de Administración
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            onClick={handleCerrarDia}
            style={{
              padding: '10px 20px',
              background: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              flex: 1,
              minWidth: '120px'
            }}
          >
            📆 Cerrar Día
          </button>
          <button
            onClick={handleVerHistorial}
            style={{
              padding: '10px 20px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              flex: 1,
              minWidth: '120px'
            }}
          >
            📊 Historial
          </button>
        </div>

        {mostrarHistorial && (
          <div style={{ marginTop: '16px' }}>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 8px 0' }}>
              Historial de Cierres
            </h4>
            {cierres.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '12px 0' }}>
                No hay cierres registrados
              </p>
            ) : (
              <>
                <div style={{
                  background: 'var(--bg-primary)',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  textAlign: 'center'
                }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                    Total acumulado: 
                  </span>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '18px' }}>
                    S/ {totalGeneral.toFixed(2)}
                  </span>
                </div>
                {cierres.map((cierre) => (
                  <div key={cierre.id} style={{
                    padding: '10px 14px',
                    background: 'var(--bg-input)',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    borderLeft: '3px solid var(--color-primary)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 'bold' }}>📅 {cierre.fecha}</span>
                      <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>
                        S/ {cierre.total.toFixed(2)}
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                      🧾 {cierre.ventas} ventas
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelAdmin;
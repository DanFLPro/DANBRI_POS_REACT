/**
 * ============================================
 * PANEL DE REGISTRO DE ELIMINACIONES
 * ============================================
 * Muestra todas las ventas eliminadas por los vendedores
 * Solo visible para el administrador
 */

import { useEliminaciones } from '../../contexts/RegistroEliminacionesContext';
import Toast from '../common/Toast';
import { useState } from 'react';

const PanelEliminaciones = () => {
  const { eliminaciones, limpiarRegistro } = useEliminaciones();
  const [toast, setToast] = useState(null);

  const mostrarToast = (mensaje, tipo = 'success') => {
    setToast({ mensaje, tipo });
    setTimeout(() => setToast(null), 3000);
  };

  const totalEliminado = eliminaciones.reduce((sum, e) => sum + e.monto, 0);

  return (
    <div style={{ marginTop: '20px' }}>
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} />}

      <div className="card" style={{
        border: '2px solid #ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.05)'
      }}>
        <div className="card-header">
          <h3 className="card-title" style={{ color: '#ef4444' }}>
            🗑️ Registro de Eliminaciones
          </h3>
          <span className="card-subtitle">{eliminaciones.length} registros</span>
        </div>

        {/* Resumen */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '14px'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            padding: '12px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              💰 Total Eliminado
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444' }}>
              S/ {totalEliminado.toFixed(2)}
            </div>
          </div>
          <div style={{
            background: 'var(--bg-primary)',
            padding: '12px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              🗑️ Ventas Eliminadas
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>
              {eliminaciones.length}
            </div>
          </div>
        </div>

        {/* Lista de eliminaciones */}
        {eliminaciones.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            padding: '20px 0',
            fontSize: '14px'
          }}>
            No hay registros de eliminaciones
          </div>
        ) : (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {eliminaciones.map((reg) => (
              <div key={reg.id} style={{
                padding: '12px 14px',
                background: 'var(--bg-input)',
                borderRadius: '10px',
                marginBottom: '8px',
                borderLeft: '3px solid #ef4444'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#ef4444' }}>
                      S/ {reg.monto.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {reg.descripcion}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      📅 Venta: {reg.fechaVenta} {reg.horaVenta}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      🗑️ Eliminado por: <span style={{ color: '#f59e0b' }}>{reg.eliminadoPor}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      ⏰ Eliminado: {reg.fechaEliminacion} {reg.horaEliminacion}
                    </div>
                    {reg.motivo && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        📝 {reg.motivo}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '20px' }}>🗑️</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botón limpiar (solo admin) */}
        {eliminaciones.length > 0 && (
          <button
            onClick={() => {
              if (limpiarRegistro()) {
                mostrarToast('✅ Registro de eliminaciones limpiado', 'success');
              }
            }}
            className="btn btn-danger"
            style={{ marginTop: '12px', width: '100%' }}
          >
            🗑️ Limpiar Registro de Eliminaciones
          </button>
        )}
      </div>
    </div>
  );
};

export default PanelEliminaciones;
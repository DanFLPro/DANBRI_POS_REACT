/**
 * ============================================
 * PÁGINA DE HISTORIAL DIARIO
 * ============================================
 * Muestra todas las ventas registradas por día
 * Permite exportar a Excel (.xlsx)
 */

import { useState } from 'react';
import { useRegistro } from '../../contexts/RegistroContext';
import Toast from '../common/Toast';
import * as XLSX from 'xlsx';  // 🔥 LIBRERÍA PARA EXCEL

const HistorialDiario = () => {
  // ============================================
  // OBTENER DATOS DEL CONTEXTO
  // ============================================
  const { 
    registros, 
    eliminarRegistro, 
    getFechasDisponibles,
    getRegistrosPorFecha,
    limpiarRegistros 
  } = useRegistro();

  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [toast, setToast] = useState(null);

  const fechas = getFechasDisponibles();
  const fechaActual = fechaSeleccionada || fechas[0] || new Date().toLocaleDateString('es-PE');
  const ventasDelDia = getRegistrosPorFecha(fechaActual);
  const totalDia = ventasDelDia.reduce((sum, v) => sum + v.monto, 0);

  const mostrarToast = (mensaje, tipo = 'success') => {
    setToast({ mensaje, tipo });
    setTimeout(() => setToast(null), 3000);
  };

  // ============================================
  // EXPORTAR DÍA A EXCEL (.xlsx)
  // ============================================
  const exportarExcel = () => {
    if (ventasDelDia.length === 0) {
      mostrarToast('No hay ventas para exportar', 'warning');
      return;
    }

    // Crear datos para Excel
    const datos = ventasDelDia.map(v => ({
      'ID': v.id,
      'Fecha': v.fecha,
      'Hora': v.hora,
      'Descripción': v.descripcion || 'Venta',
      'Monto (S/)': v.monto,
      'Vendedor': v.vendedorNombre || v.vendedor || 'Desconocido'
    }));

    // Agregar fila de total
    datos.push({
      'ID': '',
      'Fecha': '',
      'Hora': '',
      'Descripción': '✅ TOTAL DEL DÍA',
      'Monto (S/)': totalDia,
      'Vendedor': `${ventasDelDia.length} ventas`
    });

    // Crear libro de Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datos);

    // Ajustar ancho de columnas
    ws['!cols'] = [
      { wch: 15 }, // ID
      { wch: 15 }, // Fecha
      { wch: 12 }, // Hora
      { wch: 30 }, // Descripción
      { wch: 15 }, // Monto
      { wch: 20 }  // Vendedor
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
    
    // Generar archivo
    const fileName = `ventas_${fechaActual.replace(/\//g, '-')}.xlsx`;
    XLSX.writeFile(wb, fileName);
    
    mostrarToast(`✅ Exportadas ${ventasDelDia.length} ventas a Excel`, 'success');
  };

  // ============================================
  // EXPORTAR TODOS LOS REGISTROS (.xlsx)
  // ============================================
  const exportarTodoExcel = () => {
    if (registros.length === 0) {
      mostrarToast('No hay registros para exportar', 'warning');
      return;
    }

    // Crear datos para Excel
    const datos = registros.map(v => ({
      'ID': v.id,
      'Fecha': v.fecha,
      'Hora': v.hora,
      'Descripción': v.descripcion || 'Venta',
      'Monto (S/)': v.monto,
      'Vendedor': v.vendedorNombre || v.vendedor || 'Desconocido'
    }));

    // Agregar fila de total
    const totalGeneral = registros.reduce((sum, v) => sum + v.monto, 0);
    datos.push({
      'ID': '',
      'Fecha': '',
      'Hora': '',
      'Descripción': '✅ TOTAL GENERAL',
      'Monto (S/)': totalGeneral,
      'Vendedor': `${registros.length} ventas`
    });

    // Crear libro de Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datos);

    // Ajustar ancho de columnas
    ws['!cols'] = [
      { wch: 15 }, // ID
      { wch: 15 }, // Fecha
      { wch: 12 }, // Hora
      { wch: 30 }, // Descripción
      { wch: 15 }, // Monto
      { wch: 20 }  // Vendedor
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Todas las Ventas');
    
    // Generar archivo
    XLSX.writeFile(wb, 'ventas_todas.xlsx');
    
    mostrarToast(`✅ Exportadas ${registros.length} ventas totales`, 'success');
  };

  // ============================================
  // RENDERIZADO
  // ============================================
  return (
    <div>
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} />}

      {/* Título */}
      <h2 style={{
        color: 'var(--text-primary)',
        fontSize: '20px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        📋 Historial de Ventas
        <span style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          fontWeight: 'normal'
        }}>
          ({registros.length} total)
        </span>
      </h2>

      {/* Selector de fecha */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 'bold' }}>
            📅 Fecha:
          </label>
          <select
            value={fechaActual}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
            style={{
              padding: '10px 14px',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '14px',
              flex: 1,
              minWidth: '120px'
            }}
          >
            {fechas.length === 0 ? (
              <option value={new Date().toLocaleDateString('es-PE')}>
                Sin ventas registradas
              </option>
            ) : (
              fechas.map(fecha => (
                <option key={fecha} value={fecha}>
                  {fecha} ({getRegistrosPorFecha(fecha).length} ventas)
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Resumen del día */}
      <div className="stats-grid" style={{ marginBottom: '16px' }}>
        <div className="stat-card">
          <div className="stat-label">💰 Total del día</div>
          <div className="stat-value primary">S/ {totalDia.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📋 Ventas del día</div>
          <div className="stat-value info">{ventasDelDia.length}</div>
        </div>
      </div>

      {/* Botones de exportación */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={exportarExcel}
          className="btn btn-success"
          style={{ flex: 1, minWidth: '120px' }}
        >
          📊 Exportar Día a Excel
        </button>
        <button
          onClick={exportarTodoExcel}
          className="btn btn-primary"
          style={{ flex: 1, minWidth: '120px' }}
        >
          📊 Exportar Todo
        </button>
        <button
          onClick={limpiarRegistros}
          className="btn btn-danger"
          style={{ flex: 0.5, minWidth: '80px' }}
        >
          🗑️ Limpiar
        </button>
      </div>

      {/* Lista de ventas del día */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📊 Ventas del {fechaActual}</h3>
          <span className="card-subtitle">{ventasDelDia.length} ventas</span>
        </div>

        {ventasDelDia.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: 'var(--text-muted)', 
            padding: '32px 0',
            fontSize: '14px'
          }}>
            No hay ventas registradas para esta fecha
          </div>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {ventasDelDia.map((venta) => (
              <div key={venta.id} className="venta-item">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="venta-monto">S/ {venta.monto.toFixed(2)}</div>
                  <div className="venta-descripcion">{venta.descripcion || 'Venta'}</div>
                  <div className="venta-detalle">
                    <span>⏰ {venta.hora}</span>
                    <span>👤 {venta.vendedorNombre || venta.vendedor || 'Desconocido'}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      ID: {venta.id}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm('¿Eliminar este registro?')) {
                      eliminarRegistro(venta.id);
                      mostrarToast('🗑️ Registro eliminado', 'error');
                    }
                  }}
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

export default HistorialDiario;
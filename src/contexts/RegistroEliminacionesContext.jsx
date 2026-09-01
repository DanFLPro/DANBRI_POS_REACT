/**
 * ============================================
 * CONTEXTO DE REGISTRO DE ELIMINACIONES
 * ============================================
 * Guarda un registro de cada venta eliminada
 * Solo visible para el administrador
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RegistroEliminacionesContext = createContext();

export const RegistroEliminacionesProvider = ({ children }) => {
  const [eliminaciones, setEliminaciones] = useState([]);

  // Cargar registros guardados al iniciar
  useEffect(() => {
    const guardados = localStorage.getItem('danbri-eliminaciones');
    if (guardados) {
      try {
        setEliminaciones(JSON.parse(guardados));
      } catch (e) {
        console.error('Error al cargar eliminaciones:', e);
        setEliminaciones([]);
      }
    }
  }, []);

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('danbri-eliminaciones', JSON.stringify(eliminaciones));
  }, [eliminaciones]);

  /**
   * Registrar una eliminación
   */
  const registrarEliminacion = useCallback((venta, vendedor, motivo = 'Eliminada por vendedor') => {
    const registro = {
      id: Date.now(),
      ventaId: venta.id,
      fechaVenta: venta.fecha,
      horaVenta: venta.hora,
      descripcion: venta.descripcion || 'Venta',
      monto: venta.monto,
      vendedorOriginal: venta.vendedorNombre || venta.vendedor || 'Desconocido',
      eliminadoPor: vendedor?.nombre || vendedor?.username || 'Desconocido',
      motivo: motivo,
      fechaEliminacion: new Date().toLocaleDateString('es-PE'),
      horaEliminacion: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now()
    };
    setEliminaciones(prev => [registro, ...prev]);
    return registro;
  }, []);

  /**
   * Obtener todas las eliminaciones
   */
  const getEliminaciones = useCallback(() => {
    return eliminaciones;
  }, [eliminaciones]);

  /**
   * Obtener eliminaciones de un vendedor específico
   */
  const getEliminacionesPorVendedor = useCallback((vendedor) => {
    return eliminaciones.filter(e => e.eliminadoPor === vendedor);
  }, [eliminaciones]);

  /**
   * Limpiar registro de eliminaciones (solo admin)
   */
  const limpiarRegistro = useCallback(() => {
    if (confirm('⚠️ ¿Eliminar todo el registro de eliminaciones?')) {
      setEliminaciones([]);
      localStorage.removeItem('danbri-eliminaciones');
      return true;
    }
    return false;
  }, []);

  const value = {
    eliminaciones,
    registrarEliminacion,
    getEliminaciones,
    getEliminacionesPorVendedor,
    limpiarRegistro
  };

  return (
    <RegistroEliminacionesContext.Provider value={value}>
      {children}
    </RegistroEliminacionesContext.Provider>
  );
};

export const useEliminaciones = () => {
  const context = useContext(RegistroEliminacionesContext);
  if (!context) {
    throw new Error('useEliminaciones debe usarse dentro de RegistroEliminacionesProvider');
  }
  return context;
};
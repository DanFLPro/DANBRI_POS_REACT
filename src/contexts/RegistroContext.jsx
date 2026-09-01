/**
 * ============================================
 * CONTEXTO DE REGISTRO DIARIO
 * ============================================
 * Guarda todas las ventas del día en localStorage
 * Permite exportar a Excel
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Crear el contexto
const RegistroContext = createContext();

// ============================================
// PROVEEDOR
// ============================================
export const RegistroProvider = ({ children }) => {
  // Estado: lista de registros
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(false);

  // ============================================
  // CARGAR REGISTROS GUARDADOS AL INICIAR
  // ============================================
  useEffect(() => {
    const guardados = localStorage.getItem('danbri-registros');
    if (guardados) {
      try {
        setRegistros(JSON.parse(guardados));
      } catch (e) {
        console.error('Error al cargar registros:', e);
        setRegistros([]);
      }
    }
  }, []);

  // ============================================
  // GUARDAR EN LOCALSTORAGE CUANDO CAMBIEN
  // ============================================
  useEffect(() => {
    localStorage.setItem('danbri-registros', JSON.stringify(registros));
  }, [registros]);

  // ============================================
  // FUNCIONES
  // ============================================

  /**
   * Agregar una nueva venta al registro
   * @param {Object} venta - Datos de la venta
   */
  const agregarRegistro = useCallback((venta) => {
    const nuevoRegistro = {
      id: Date.now(),
      ...venta,
      registradoEn: new Date().toISOString()
    };
    setRegistros(prev => [nuevoRegistro, ...prev]);
    return nuevoRegistro;
  }, []);

  /**
   * Eliminar un registro por ID
   * @param {number} id - ID del registro
   */
  const eliminarRegistro = useCallback((id) => {
    setRegistros(prev => prev.filter(r => r.id !== id));
  }, []);

  /**
   * Obtener registros de una fecha específica
   * @param {string} fecha - Fecha en formato DD/MM/YYYY
   */
  const getRegistrosPorFecha = useCallback((fecha) => {
    return registros.filter(r => r.fecha === fecha);
  }, [registros]);

  /**
   * Obtener el total de ventas de hoy
   */
  const getTotalHoy = useCallback(() => {
    const hoy = new Date().toLocaleDateString('es-PE');
    const ventasHoy = registros.filter(r => r.fecha === hoy);
    return ventasHoy.reduce((sum, v) => sum + v.monto, 0);
  }, [registros]);

  /**
   * Obtener todas las fechas disponibles
   */
  const getFechasDisponibles = useCallback(() => {
    const fechas = [...new Set(registros.map(r => r.fecha))];
    return fechas.sort((a, b) => {
      const [da, ma, aa] = a.split('/');
      const [db, mb, ab] = b.split('/');
      return new Date(ab, mb-1, db) - new Date(aa, ma-1, da);
    });
  }, [registros]);

  /**
   * Limpiar todos los registros (con confirmación)
   */
  const limpiarRegistros = useCallback(() => {
    if (confirm('⚠️ ¿Eliminar TODOS los registros guardados?')) {
      setRegistros([]);
      localStorage.removeItem('danbri-registros');
      return true;
    }
    return false;
  }, []);

  // ============================================
  // VALORES QUE SE EXPORTAN
  // ============================================
  const value = {
    registros,
    loading,
    agregarRegistro,
    eliminarRegistro,
    getRegistrosPorFecha,
    getTotalHoy,
    getFechasDisponibles,
    limpiarRegistros
  };

  return (
    <RegistroContext.Provider value={value}>
      {children}
    </RegistroContext.Provider>
  );
};

// ============================================
// HOOK PERSONALIZADO
// ============================================
export const useRegistro = () => {
  const context = useContext(RegistroContext);
  if (!context) {
    throw new Error('useRegistro debe usarse dentro de RegistroProvider');
  }
  return context;
};
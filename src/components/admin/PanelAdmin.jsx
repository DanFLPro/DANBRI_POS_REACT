/**
 * ============================================
 * PANEL DE ADMINISTRADOR - VERSIÓN MÓVIL
 * ============================================
 * 
 * 📌 ¿QUÉ HACE ESTE COMPONENTE?
 * ---------------------------------------------
 * Funciones exclusivas para administradores:
 * 1. Cerrar el día (archivar ventas)
 * 2. Ver resumen general de ventas
 * 3. Ver historial de cierres
 * 
 * 🎯 CARACTERÍSTICAS:
 * ---------------------------------------------
 * ✅ Solo visible para usuarios con rol "admin"
 * ✅ Diseño compacto para móvil
 * ✅ Acciones con un solo toque
 * 
 * 🔧 CÓMO MODIFICARLO:
 * ---------------------------------------------
 * 1. Cambiar colores: Buscar '#ff6b00' o '#00b894'
 * 2. Agregar más acciones: Añadir más botones
 * 3. Cambiar datos de ejemplo: Modificar el useState de historial
 * 4. Agregar exportar datos: Añadir botón de exportar
 * ============================================
 */

import { useState } from 'react';
import Boton from '../common/Boton';

const PanelAdmin = () => {
  // ============================================
  // ESTADO LOCAL
  // ============================================
  
  // Historial de cierres (datos de ejemplo)
  const [historial, setHistorial] = useState([
    { id: 1, fecha: '01/09/2026', total: 1250.00, ventas: 15 },
    { id: 2, fecha: '31/08/2026', total: 980.00, ventas: 12 },
  ]);
  
  // Controla si se muestra o no el historial
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  // ============================================
  // CÁLCULOS
  // ============================================
  
  // Total acumulado de todos los cierres
  const totalGeneral = historial.reduce((sum, h) => sum + h.total, 0);
  
  // Total de ventas acumuladas
  const totalVentasGeneral = historial.reduce((sum, h) => sum + h.ventas, 0);

  // ============================================
  // FUNCIONES DE ACCIÓN
  // ============================================
  
  /**
   * handleCerrarDia - Cierra el día actual
   * (Simulación - después se conectará con Firebase)
   */
  const handleCerrarDia = () => {
    // Aquí irá la lógica para cerrar el día
    alert('📆 Función de cierre de día (próximamente con Firebase)');
  };

  /**
   * toggleHistorial - Muestra u oculta el historial
   */
  const toggleHistorial = () => {
    setMostrarHistorial(!mostrarHistorial);
  };

  /**
   * handleReiniciar - Reinicia todas las ventas
   * (Solo para emergencias)
   */
  const handleReiniciar = () => {
    if (confirm('⚠️ ¿Reiniciar TODAS las ventas? Esta acción NO se puede deshacer.')) {
      alert('✅ Todas las ventas han sido eliminadas (simulado)');
      // Aquí irá la lógica real con Firebase
    }
  };

  // ============================================
  // RENDERIZADO
  // ============================================
  
  return (
    <div style={{ marginTop: '24px' }}>
      {/* Título de la sección */}
      <h2 style={{ 
        color: 'white', 
        fontSize: '18px', 
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        🛠️ Panel Admin
      </h2>

      {/* ======================================== */}
      {/* TARJETAS DE ACCIONES                     */}
      {/* ======================================== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr', // Una columna (apilado)
        gap: '12px',
        marginBottom: '20px'
      }}>
        
        {/* Tarjeta 1: Cerrar Día */}
        <div style={{
          background: '#1a1a1a',
          padding: '16px',
          borderRadius: '16px',
          border: '1px solid #2a2a2a'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: '12px'
          }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>📆 Cerrar Día</div>
              <div style={{ color: '#888', fontSize: '12px' }}>
                Archiva las ventas del día
              </div>
            </div>
            <Boton 
              variante="success" 
              tamaño="sm"
              onClick={handleCerrarDia}
            >
              Cerrar
            </Boton>
          </div>
        </div>

        {/* Tarjeta 2: Resumen General */}
        <div style={{
          background: '#1a1a1a',
          padding: '16px',
          borderRadius: '16px',
          border: '1px solid #2a2a2a'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: '12px'
          }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>📊 Resumen</div>
              <div style={{ color: '#888', fontSize: '12px' }}>
                Total acumulado
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#ff6b00', fontWeight: 'bold', fontSize: '18px' }}>
                S/ {totalGeneral.toFixed(2)}
              </div>
              <div style={{ color: '#00b4d8', fontSize: '12px' }}>
                {totalVentasGeneral} ventas
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 3: Reiniciar (Peligro) */}
        <div style={{
          background: '#1a1a1a',
          padding: '16px',
          borderRadius: '16px',
          border: '1px solid #2a2a2a'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: '12px'
          }}>
            <div>
              <div style={{ fontWeight: 'bold', color: '#ff4757' }}>⚠️ Reiniciar</div>
              <div style={{ color: '#888', fontSize: '12px' }}>
                Elimina TODAS las ventas
              </div>
            </div>
            <Boton 
              variante="danger" 
              tamaño="sm"
              onClick={handleReiniciar}
            >
              Reiniciar
            </Boton>
          </div>
        </div>
      </div>

      {/* ======================================== */}
      {/* HISTORIAL DE CIERRES                     */}
      {/* ======================================== */}
      <div style={{
        background: '#1a1a1a',
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid #2a2a2a'
      }}>
        {/* Cabecera del historial con botón toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <h3 style={{ margin: 0, fontSize: '16px' }}>📋 Historial</h3>
          <Boton 
            variante="secondary" 
            tamaño="sm"
            onClick={toggleHistorial}
          >
            {mostrarHistorial ? 'Ocultar' : 'Ver'}
          </Boton>
        </div>

        {/* Contenido del historial (se muestra solo si está activo) */}
        {mostrarHistorial && (
          <div>
            {historial.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', padding: '16px 0' }}>
                No hay cierres registrados
              </p>
            ) : (
              // Lista de cierres
              historial.map((cierre) => (
                <div key={cierre.id} style={{
                  padding: '12px 14px',
                  background: '#222',
                  borderRadius: '10px',
                  marginBottom: '8px',
                  borderLeft: '3px solid #00b894', // Línea verde a la izquierda
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                      📅 {cierre.fecha}
                    </div>
                    <div style={{ color: '#888', fontSize: '12px' }}>
                      🧾 {cierre.ventas} ventas
                    </div>
                  </div>
                  <div style={{ 
                    color: '#ff6b00', 
                    fontWeight: 'bold', 
                    fontSize: '18px' 
                  }}>
                    S/ {cierre.total.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelAdmin;
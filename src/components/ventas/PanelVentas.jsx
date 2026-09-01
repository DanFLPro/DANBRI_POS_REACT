/**
 * ============================================
 * PANEL DE VENTAS - VERSIÓN MÓVIL
 * ============================================
 * 
 * 📌 ¿QUÉ HACE ESTE COMPONENTE?
 * ---------------------------------------------
 * Es el corazón del POS. Permite:
 * 1. Ver estadísticas (total y cantidad de ventas)
 * 2. Registrar nuevas ventas
 * 3. Listar todas las ventas realizadas
 * 4. Eliminar ventas individuales
 * 
 * 🎯 ESTRUCTURA:
 * ---------------------------------------------
 * 1. Tarjetas de estadísticas (Total / Cantidad)
 * 2. Formulario para registrar nueva venta
 * 3. Lista de ventas con opción de eliminar
 * 
 * 🔧 CÓMO MODIFICARLO:
 * ---------------------------------------------
 * 1. Cambiar colores: Buscar '#ff6b00' o '#00b4d8'
 * 2. Agregar campo extra: Agregar un nuevo <Input>
 * 3. Cambiar mensajes: Modificar los alert()
 * 4. Agregar filtros: Añadir un input de búsqueda
 * 5. Editar venta: Agregar botón de editar en cada item
 * ============================================
 */

import { useState } from 'react';
import Boton from '../common/Boton';
import Input from '../common/Input';

const PanelVentas = () => {
  // ============================================
  // ESTADO LOCAL
  // ============================================
  
  // Lista de ventas (datos de ejemplo)
  const [ventas, setVentas] = useState([
    { id: 1, monto: 150.00, descripcion: 'Producto A', fecha: '01/09/2026', hora: '14:30', vendedor: 'Daniel' },
    { id: 2, monto: 75.50, descripcion: 'Producto B', fecha: '01/09/2026', hora: '15:45', vendedor: 'Daniel' },
  ]);
  
  // Campos del formulario
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cargando, setCargando] = useState(false);

  // ============================================
  // CÁLCULOS
  // ============================================
  
  // Total de todas las ventas
  const total = ventas.reduce((sum, v) => sum + v.monto, 0);

  // ============================================
  // FUNCIONES DEL CRUD
  // ============================================
  
  /**
   * handleRegistrar - Registra una nueva venta
   * @param {Event} e - Evento del formulario
   */
  const handleRegistrar = (e) => {
    e.preventDefault();
    
    // Validación: El monto es obligatorio y debe ser mayor a 0
    if (!monto || parseFloat(monto) <= 0) {
      alert('⚠️ Ingresa un monto válido');
      return;
    }

    setCargando(true);
    
    // Simulación de guardado (después será Firebase)
    setTimeout(() => {
      const nuevaVenta = {
        id: Date.now(), // ID único basado en timestamp
        monto: parseFloat(monto),
        descripcion: descripcion || 'Venta', // Si no hay descripción, usa "Venta"
        fecha: new Date().toLocaleDateString('es-PE'),
        hora: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
        vendedor: 'Daniel' // Temporal, después será el usuario logueado
      };
      
      // Agregar la nueva venta al inicio de la lista
      setVentas([nuevaVenta, ...ventas]);
      
      // Limpiar el formulario
      setMonto('');
      setDescripcion('');
      setCargando(false);
      
      // Mostrar confirmación
      alert('✅ Venta registrada correctamente');
    }, 500);
  };

  /**
   * handleEliminar - Elimina una venta por su ID
   * @param {number|string} id - ID de la venta a eliminar
   */
  const handleEliminar = (id) => {
    // Confirmación antes de eliminar
    if (confirm('¿Estás seguro de eliminar esta venta?')) {
      // Filtrar la venta que coincide con el ID
      setVentas(ventas.filter(v => v.id !== id));
    }
  };

  // ============================================
  // RENDERIZADO
  // ============================================
  
  return (
    <div>
      {/* ======================================== */}
      {/* TARJETAS DE ESTADÍSTICAS                 */}
      {/* ======================================== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Dos columnas iguales
        gap: '12px',
        marginBottom: '20px'
      }}>
        {/* Tarjeta 1: Total */}
        <div style={{
          background: '#1a1a1a',
          padding: '16px',
          borderRadius: '16px',
          border: '1px solid #2a2a2a',
          textAlign: 'center'
        }}>
          <div style={{ color: '#888', fontSize: '12px' }}>💰 Total</div>
          <div style={{ 
            color: '#ff6b00', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginTop: '4px'
          }}>
            S/ {total.toFixed(2)}
          </div>
        </div>
        
        {/* Tarjeta 2: Cantidad de ventas */}
        <div style={{
          background: '#1a1a1a',
          padding: '16px',
          borderRadius: '16px',
          border: '1px solid #2a2a2a',
          textAlign: 'center'
        }}>
          <div style={{ color: '#888', fontSize: '12px' }}>📋 Ventas</div>
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

      {/* ======================================== */}
      {/* FORMULARIO DE REGISTRO                   */}
      {/* ======================================== */}
      <div style={{
        background: '#1a1a1a',
        padding: '20px',
        borderRadius: '16px',
        border: '1px solid #2a2a2a',
        marginBottom: '20px'
      }}>
        <h3 style={{
          color: '#ff6b00',
          fontSize: '16px',
          margin: '0 0 16px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          📝 Nueva Venta
        </h3>

        <form onSubmit={handleRegistrar}>
          {/* Campo: Monto */}
          <Input
            label="Monto (S/)"
            tipo="number"
            placeholder="0.00"
            valor={monto}
            onChange={setMonto}
            requerido
          />
          
          {/* Campo: Descripción */}
          <div style={{ marginTop: '12px' }}>
            <Input
              label="Descripción"
              placeholder="¿Qué vendiste?"
              valor={descripcion}
              onChange={setDescripcion}
            />
          </div>
          
          {/* Botón Registrar */}
          <div style={{ marginTop: '16px' }}>
            <Boton
              tipo="submit"
              variante="primary"
              anchoCompleto
              cargando={cargando}
              tamaño="lg"
              icono="➕"
            >
              {cargando ? 'Registrando...' : 'Registrar Venta'}
            </Boton>
          </div>
        </form>
      </div>

      {/* ======================================== */}
      {/* LISTA DE VENTAS                         */}
      {/* ======================================== */}
      <div style={{
        background: '#1a1a1a',
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid #2a2a2a'
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '16px',
          margin: '0 0 16px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>📊 Últimas Ventas</span>
          <span style={{ color: '#666', fontSize: '12px', fontWeight: 'normal' }}>
            {ventas.length} ventas
          </span>
        </h3>

        {/* Si no hay ventas, mostrar mensaje */}
        {ventas.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#666', 
            padding: '32px 0',
            fontSize: '14px'
          }}>
            No hay ventas registradas
          </div>
        ) : (
          // Lista de ventas con scroll
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {ventas.map((venta) => (
              <div key={venta.id} style={{
                padding: '14px 16px',
                borderBottom: '1px solid #2a2a2a',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                transition: 'background 0.2s'
              }}
              // Efecto hover (para desktop)
              onMouseEnter={(e) => e.target.style.background = '#222'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                {/* Información de la venta */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    color: '#ff6b00',
                    fontSize: '18px'
                  }}>
                    S/ {venta.monto.toFixed(2)}
                  </div>
                  <div style={{ 
                    color: '#ccc', 
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {venta.descripcion}
                  </div>
                  <div style={{ 
                    color: '#666', 
                    fontSize: '11px',
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}>
                    <span>📅 {venta.fecha}</span>
                    <span>⏰ {venta.hora}</span>
                    <span>👤 {venta.vendedor}</span>
                  </div>
                </div>
                
                {/* Botón Eliminar */}
                <button
                  onClick={() => handleEliminar(venta.id)}
                  style={{
                    background: 'rgba(255, 71, 87, 0.15)',
                    color: '#ff4757',
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
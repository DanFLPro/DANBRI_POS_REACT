/**
 * ============================================
 * PANEL DE GESTIÓN DE PRODUCTOS - DISEÑO MÓVIL
 * ============================================
 * - Agregar productos
 * - Ver lista de productos
 * - Editar productos
 * - Eliminar productos
 */

import { useState } from 'react';
import { useProductos } from '../../contexts/ProductoContext';
import Toast from '../common/Toast';

const PanelProductos = () => {
  const { productos, agregarProducto, editarProducto, eliminarProducto, loading } = useProductos();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [toast, setToast] = useState(null);
  const [editando, setEditando] = useState(null);

  const mostrarToast = (mensaje, tipo = 'success') => {
    setToast({ mensaje, tipo });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nombre || !precio) {
      mostrarToast('⚠️ Completa todos los campos', 'warning');
      return;
    }
    const result = await agregarProducto(nombre, precio, stock);
    if (result.success) {
      mostrarToast(`✅ Producto "${nombre}" agregado`, 'success');
      setNombre('');
      setPrecio('');
      setStock('');
    } else {
      mostrarToast('❌ Error al agregar producto', 'error');
    }
  };

  const handleEditar = (id) => {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    setEditando(id);
    setNombre(producto.nombre);
    setPrecio(producto.precio.toString());
    setStock(producto.stock.toString());
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    if (!editando) return;
    const result = await editarProducto(editando, nombre, precio, stock);
    if (result.success) {
      mostrarToast('✅ Producto actualizado', 'success');
      setEditando(null);
      setNombre('');
      setPrecio('');
      setStock('');
    } else {
      mostrarToast('❌ Error al actualizar', 'error');
    }
  };

  const handleEliminar = async (id) => {
    if (confirm('¿Eliminar este producto?')) {
      const result = await eliminarProducto(id);
      if (result.success) {
        mostrarToast('🗑️ Producto eliminado', 'error');
      } else {
        mostrarToast('❌ Error al eliminar', 'error');
      }
    }
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setNombre('');
    setPrecio('');
    setStock('');
  };

  return (
    <div style={{ paddingBottom: '16px' }}>
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} />}

      {/* ======================================== */}
      {/* TÍTULO                                  */}
      {/* ======================================== */}
      <h2 style={{
        color: 'var(--text-primary)',
        fontSize: '20px',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        🏷️ Gestión de Productos
        <span style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          fontWeight: 'normal'
        }}>
          ({productos.length} productos)
        </span>
      </h2>

      {/* ======================================== */}
      {/* FORMULARIO - UNA COLUMNA                */}
      {/* ======================================== */}
      <div className="card" style={{
        border: '2px solid var(--color-primary)',
        marginBottom: '16px'
      }}>
        <h3 className="card-title" style={{ 
          color: 'var(--color-primary)', 
          marginBottom: '14px',
          fontSize: '16px'
        }}>
          {editando ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
        </h3>

        <form onSubmit={editando ? handleActualizar : handleAgregar}>
          {/* Nombre */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ 
              fontSize: '13px', 
              color: 'var(--text-secondary)',
              fontWeight: '500',
              display: 'block',
              marginBottom: '4px'
            }}>
              📦 Nombre del producto
            </label>
            <input
              type="text"
              className="input"
              placeholder="Ej: Producto A"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          {/* Precio y Stock - DOS COLUMNAS */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '10px',
            marginBottom: '16px'
          }}>
            <div>
              <label style={{ 
                fontSize: '13px', 
                color: 'var(--text-secondary)',
                fontWeight: '500',
                display: 'block',
                marginBottom: '4px'
              }}>
                💰 Precio (S/)
              </label>
              <input
                type="number"
                className="input"
                placeholder="0.00"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label style={{ 
                fontSize: '13px', 
                color: 'var(--text-secondary)',
                fontWeight: '500',
                display: 'block',
                marginBottom: '4px'
              }}>
                📦 Stock
              </label>
              <input
                type="number"
                className="input"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                min="0"
              />
            </div>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ 
                flex: 1,
                opacity: loading ? 0.6 : 1,
                fontSize: '15px',
                fontWeight: '600',
                padding: '14px'
              }}
            >
              {loading ? '⏳ Procesando...' : (editando ? '✅ Actualizar' : '➕ Agregar')}
            </button>
            {editando && (
              <button
                type="button"
                onClick={cancelarEdicion}
                className="btn btn-secondary"
                style={{ padding: '14px 20px' }}
              >
                ❌ Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ======================================== */}
      {/* LISTA DE PRODUCTOS                      */}
      {/* ======================================== */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📦 Productos</h3>
          <span className="card-subtitle">{productos.length} productos</span>
        </div>

        {productos.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: 'var(--text-muted)', 
            padding: '30px 0',
            fontSize: '14px'
          }}>
            No hay productos registrados
          </div>
        ) : (
          <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
            {productos.map((producto) => (
              <div key={producto.id} className="producto-item" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                borderBottom: '1px solid var(--border-color)',
                transition: 'background 0.2s',
                gap: '10px'
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="producto-nombre" style={{
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    fontSize: '15px'
                  }}>
                    {producto.nombre}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '14px',
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    marginTop: '2px'
                  }}>
                    <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
                      S/ {producto.precio.toFixed(2)}
                    </span>
                    <span>📦 Stock: {producto.stock || 0}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button
                    onClick={() => handleEditar(producto.id)}
                    style={{
                      padding: '8px 14px',
                      background: 'var(--color-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      minWidth: '40px',
                      minHeight: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleEliminar(producto.id)}
                    style={{
                      padding: '8px 14px',
                      background: 'rgba(239, 68, 68, 0.12)',
                      color: '#ef4444',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      minWidth: '40px',
                      minHeight: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelProductos;
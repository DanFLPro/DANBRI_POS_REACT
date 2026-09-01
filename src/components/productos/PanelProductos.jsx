/**
 * ============================================
 * PANEL DE GESTIÓN DE PRODUCTOS
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
      mostrarToast('Completa todos los campos', 'warning');
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

  const handleEditar = async (id) => {
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
        mostrarToast('✅ Producto eliminado', 'success');
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
    <div style={{ marginTop: '20px' }}>
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} />}

      <h2 style={{
        color: 'var(--text-primary)',
        fontSize: '20px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        🏷️ Gestión de Productos
      </h2>

      <div style={{
        background: 'var(--bg-card)',
        padding: '20px',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        marginBottom: '16px'
      }}>
        <h3 style={{
          color: 'var(--text-secondary)',
          fontSize: '14px',
          margin: '0 0 12px 0'
        }}>
          {editando ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
        </h3>

        <form onSubmit={editando ? handleActualizar : handleAgregar}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{
                padding: '10px 14px',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              required
            />
            <input
              type="number"
              placeholder="Precio (S/)"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              style={{
                padding: '10px 14px',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              required
              step="0.01"
              min="0"
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              style={{
                padding: '10px 14px',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              min="0"
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 24px',
                background: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? '⏳ Procesando...' : (editando ? '✅ Actualizar' : '➕ Agregar')}
            </button>
            {editando && (
              <button
                type="button"
                onClick={cancelarEdicion}
                style={{
                  padding: '10px 24px',
                  background: 'var(--bg-input)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                ❌ Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{
          color: 'var(--text-secondary)',
          fontSize: '14px',
          margin: '0 0 12px 0'
        }}>
          📦 Productos ({productos.length})
        </h3>

        {productos.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0' }}>
            No hay productos registrados
          </p>
        ) : (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {productos.map((producto) => (
              <div key={producto.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                borderBottom: '1px solid var(--border-color)',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--bg-card-hover)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    {producto.nombre}
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <span>💰 S/ {producto.precio.toFixed(2)}</span>
                    <span>📦 Stock: {producto.stock || 0}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => handleEditar(producto.id)}
                    style={{
                      padding: '6px 12px',
                      background: 'var(--color-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleEliminar(producto.id)}
                    style={{
                      padding: '6px 12px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px'
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
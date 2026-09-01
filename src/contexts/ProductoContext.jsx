/**
 * ============================================
 * CONTEXTO DE PRODUCTOS
 * ============================================
 * Gestiona el estado de los productos
 */

import { createContext, useContext, useState, useCallback } from 'react';

const ProductoContext = createContext();

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Producto A', precio: 150.00, stock: 10 },
    { id: 2, nombre: 'Producto B', precio: 75.50, stock: 5 },
    { id: 3, nombre: 'Producto C', precio: 200.00, stock: 3 },
  ]);
  const [loading, setLoading] = useState(false);

  const agregarProducto = useCallback(async (nombre, precio, stock) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const nuevoProducto = {
        id: Date.now(),
        nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock) || 0
      };
      setProductos(prev => [nuevoProducto, ...prev]);
      setLoading(false);
      return { success: true, producto: nuevoProducto };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  }, []);

  const editarProducto = useCallback(async (id, nombre, precio, stock) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProductos(prev =>
        prev.map(p =>
          p.id === id
            ? { ...p, nombre, precio: parseFloat(precio), stock: parseInt(stock) || 0 }
            : p
        )
      );
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  }, []);

  const eliminarProducto = useCallback(async (id) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProductos(prev => prev.filter(p => p.id !== id));
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  }, []);

  const value = {
    productos,
    loading,
    agregarProducto,
    editarProducto,
    eliminarProducto
  };

  return (
    <ProductoContext.Provider value={value}>
      {children}
    </ProductoContext.Provider>
  );
};

export const useProductos = () => {
  const context = useContext(ProductoContext);
  if (!context) {
    throw new Error('useProductos debe usarse dentro de ProductoProvider');
  }
  return context;
};
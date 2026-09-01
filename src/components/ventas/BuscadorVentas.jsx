/**
 * ============================================
 * BUSCADOR DE VENTAS
 * ============================================
 * Permite filtrar ventas por texto (descripción, vendedor)
 */

import { useState } from 'react';

const BuscadorVentas = ({ ventas, onFiltrar, placeholder = '🔍 Buscar ventas...' }) => {
  const [busqueda, setBusqueda] = useState('');

  const handleChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    
    if (valor.trim() === '') {
      onFiltrar(ventas);
      return;
    }

    const textoBusqueda = valor.toLowerCase();
    const filtradas = ventas.filter(v => 
      (v.descripcion || '').toLowerCase().includes(textoBusqueda) ||
      (v.vendedor || '').toLowerCase().includes(textoBusqueda) ||
      (v.vendedorNombre || '').toLowerCase().includes(textoBusqueda)
    );
    onFiltrar(filtradas);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={busqueda}
      onChange={handleChange}
      style={{
        width: '100%',
        padding: '12px 16px',
        background: 'var(--bg-input)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        fontSize: '14px',
        marginBottom: '16px',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
        outline: 'none'
      }}
      onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
      onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
    />
  );
};

export default BuscadorVentas;
/**
 * BOTÓN REUTILIZABLE
 * Variantes: primary, secondary, success, danger, warning
 */

const Boton = ({ 
  children, 
  onClick, 
  variante = 'primary',
  tamaño = 'md',
  deshabilitado = false,
  cargando = false,
  anchoCompleto = false,
  tipo = 'button',
  icono = null
}) => {
  // Estilos por variante
  const estilosVariante = {
    primary: {
      background: '#ff6b00',
      color: 'white',
      hover: '#e55f00'
    },
    secondary: {
      background: 'transparent',
      color: '#ff6b00',
      border: '2px solid #ff6b00',
      hover: 'rgba(255, 107, 0, 0.1)'
    },
    success: {
      background: '#00b894',
      color: 'white',
      hover: '#00a381'
    },
    danger: {
      background: '#ff4757',
      color: 'white',
      hover: '#e63e4d'
    },
    warning: {
      background: '#fdcb6e',
      color: '#2d3436',
      hover: '#fdcb6e'
    }
  };

  // Estilos por tamaño
  const estilosTamaño = {
    sm: { padding: '6px 14px', fontSize: '12px' },
    md: { padding: '10px 20px', fontSize: '14px' },
    lg: { padding: '14px 28px', fontSize: '16px' }
  };

  const estilo = estilosVariante[variante] || estilosVariante.primary;
  const tamañoEstilo = estilosTamaño[tamaño] || estilosTamaño.md;

  const styles = {
    border: estilo.border || 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: deshabilitado || cargando ? 'not-allowed' : 'pointer',
    opacity: deshabilitado || cargando ? 0.5 : 1,
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: anchoCompleto ? '100%' : 'auto',
    ...tamañoEstilo,
    background: estilo.background,
    color: estilo.color
  };

  const handleMouseEnter = (e) => {
    if (deshabilitado || cargando) return;
    if (estilo.hover) {
      e.target.style.background = estilo.hover;
    }
  };

  const handleMouseLeave = (e) => {
    if (deshabilitado || cargando) return;
    e.target.style.background = estilo.background;
  };

  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={deshabilitado || cargando}
      style={styles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cargando && '⏳ '}
      {icono && <span>{icono}</span>}
      {children}
    </button>
  );
};

export default Boton;
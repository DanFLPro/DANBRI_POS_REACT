/**
 * TARJETA REUTILIZABLE
 * Componente base para contenedores
 */

const Tarjeta = ({ 
  children, 
  titulo, 
  icono, 
  className = '',
  sinPadding = false 
}) => {
  return (
    <div style={{
      background: '#1a1a1a',
      borderRadius: '16px',
      border: '1px solid #2a2a2a',
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
    }}>
      {/* Cabecera (opcional) */}
      {titulo && (
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #2a2a2a',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {icono && <span style={{ fontSize: '20px' }}>{icono}</span>}
          <h3 style={{ 
            margin: 0, 
            color: 'white', 
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            {titulo}
          </h3>
        </div>
      )}
      
      {/* Contenido */}
      <div style={{
        padding: sinPadding ? 0 : '20px'
      }}>
        {children}
      </div>
    </div>
  );
};

export default Tarjeta;
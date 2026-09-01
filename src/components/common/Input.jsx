/**
 * INPUT REUTILIZABLE
 * Campo de entrada con etiqueta y validación
 */

const Input = ({ 
  label,
  tipo = 'text',
  placeholder,
  valor,
  onChange,
  error,
  deshabilitado = false,
  requerido = false,
  icono = null,
  className = ''
}) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%'
    },
    label: {
      color: '#ccc',
      fontSize: '13px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    input: {
      padding: '10px 14px',
      background: '#222',
      color: 'white',
      border: error ? '2px solid #ff4757' : '1px solid #333',
      borderRadius: '8px',
      fontSize: '14px',
      transition: 'border-color 0.2s',
      width: '100%',
      boxSizing: 'border-box',
      outline: 'none'
    },
    error: {
      color: '#ff4757',
      fontSize: '12px',
      marginTop: '2px'
    }
  };

  return (
    <div style={styles.container}>
      {label && (
        <label style={styles.label}>
          {icono && <span>{icono}</span>}
          {label}
          {requerido && <span style={{ color: '#ff4757' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          type={tipo}
          placeholder={placeholder}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          disabled={deshabilitado}
          style={styles.input}
          className={className}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = '#ff6b00';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? '#ff4757' : '#333';
          }}
        />
      </div>
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export default Input;
/**
 * ============================================
 * REPORTE DE VENTAS - GRÁFICAS Y ESTADÍSTICAS
 * ============================================
 * Muestra:
 * - Ventas por día
 * - Ventas por vendedor
 * - Total acumulado
 * - Barra de progreso visual
 */

const ReporteVentas = ({ ventas }) => {
  if (!ventas || ventas.length === 0) {
    return (
      <div style={{
        background: 'var(--bg-card)',
        padding: '20px',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        marginBottom: '16px',
        textAlign: 'center',
        color: 'var(--text-muted)'
      }}>
        📊 No hay ventas para mostrar en el reporte
      </div>
    );
  }

  // ============================================
  // CÁLCULOS
  // ============================================
  
  const totalGeneral = ventas.reduce((sum, v) => sum + v.monto, 0);
  
  const ventasPorVendedor = ventas.reduce((acc, v) => {
    const nombre = v.vendedorNombre || v.vendedor || 'Desconocido';
    acc[nombre] = (acc[nombre] || 0) + v.monto;
    return acc;
  }, {});

  const ventasPorDia = ventas.reduce((acc, v) => {
    acc[v.fecha] = (acc[v.fecha] || 0) + v.monto;
    return acc;
  }, {});

  const diasOrdenados = Object.keys(ventasPorDia).sort((a, b) => {
    const [da, ma, aa] = a.split('/');
    const [db, mb, ab] = b.split('/');
    return new Date(ab, mb-1, db) - new Date(aa, ma-1, da);
  });

  const maxVentas = Math.max(...Object.values(ventasPorVendedor), 0);
  const maxDia = Math.max(...Object.values(ventasPorDia), 0);

  return (
    <div style={{
      background: 'var(--bg-card)',
      padding: '20px',
      borderRadius: '16px',
      border: '1px solid var(--border-color)',
      marginBottom: '16px'
    }}>
      <h3 style={{
        margin: '0 0 16px 0',
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        📊 Reporte de Ventas
      </h3>

      {/* Total Acumulado */}
      <div style={{
        background: 'var(--bg-primary)',
        padding: '16px',
        borderRadius: '12px',
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          💰 Total Acumulado
        </div>
        <div style={{
          color: 'var(--color-primary)',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          S/ {totalGeneral.toFixed(2)}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
          {ventas.length} ventas registradas
        </div>
      </div>

      {/* Ventas por Vendedor */}
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{
          color: 'var(--text-secondary)',
          fontSize: '14px',
          margin: '0 0 8px 0'
        }}>
          👤 Por Vendedor
        </h4>
        {Object.entries(ventasPorVendedor).map(([nombre, total]) => {
          const porcentaje = maxVentas > 0 ? (total / maxVentas) * 100 : 0;
          return (
            <div key={nombre} style={{ marginBottom: '6px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '13px',
                marginBottom: '2px'
              }}>
                <span>{nombre}</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>
                  S/ {total.toFixed(2)}
                </span>
              </div>
              <div style={{
                height: '6px',
                background: 'var(--bg-input)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${porcentaje}%`,
                  height: '100%',
                  background: 'var(--color-primary)',
                  borderRadius: '4px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Ventas por Día */}
      <div>
        <h4 style={{
          color: 'var(--text-secondary)',
          fontSize: '14px',
          margin: '0 0 8px 0'
        }}>
          📅 Por Día
        </h4>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          maxHeight: '150px',
          overflowY: 'auto'
        }}>
          {diasOrdenados.map((fecha) => {
            const total = ventasPorDia[fecha];
            const porcentaje = maxDia > 0 ? (total / maxDia) * 100 : 0;
            return (
              <div key={fecha} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  minWidth: '80px'
                }}>
                  {fecha}
                </span>
                <div style={{
                  flex: 1,
                  height: '4px',
                  background: 'var(--bg-input)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${porcentaje}%`,
                    height: '100%',
                    background: 'var(--color-primary)',
                    borderRadius: '4px',
                    transition: 'width 0.5s ease'
                  }} />
                </div>
                <span style={{
                  fontSize: '12px',
                  color: 'var(--color-primary)',
                  fontWeight: 'bold',
                  minWidth: '60px',
                  textAlign: 'right'
                }}>
                  S/ {total.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReporteVentas;
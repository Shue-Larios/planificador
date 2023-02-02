
// convertir una cantidad a una representacion de dinero
export const formatearCantidad = (cantidad) => {

  return Number(cantidad).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}


// para formatear la fecha
export const formatearFecha = (fecha) => {

  const Nuevafecha = new Date(fecha);
  const opciones = {
    year: 'numeric',
    // month: 'short',
    month: 'long',
    day: '2-digit'
    // otra opcion
    // year: '2-digit',
    // month: '2-digit',
    // day: '2-digit'
  }
  return Nuevafecha.toLocaleDateString('es-ES',opciones )
}



export const generarId = () => {
  // substring(2,11) dice que quitamos dsd el puesto 2 al 11
  const random = Math.random().toString(36).substring(2,11)

  const fecha = Date.now().toString(36)
   return random + fecha
}
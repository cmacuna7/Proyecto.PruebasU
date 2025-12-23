// Simular API de Vendedores para Lab2 - JMeter/ZAP
const vendedores = [];

// Validaciones
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{7,15}$/;

// POST: Crear vendedor
function crearVendedor(body) {
  const { name, email, telefono, comision, codigoEmpleado } = body;

  if (!name || !email || !telefono || comision === undefined || !codigoEmpleado) {
    return { status: 400, message: 'Nombre, Email, Teléfono, Comisión y Código Empleado son requeridos' };
  }

  if (!emailRegex.test(email)) {
    return { status: 400, message: 'El email no es válido' };
  }

  if (!phoneRegex.test(telefono)) {
    return { status: 400, message: 'El teléfono debe contener solo números y tener entre 7 y 15 dígitos' };
  }

  if (isNaN(comision) || comision < 0 || comision > 100) {
    return { status: 400, message: 'La comisión debe ser un número entre 0 y 100' };
  }

  if (vendedores.some(v => v.email === email)) {
    return { status: 409, message: 'El email ya está registrado' };
  }

  if (vendedores.some(v => v.codigoEmpleado === codigoEmpleado)) {
    return { status: 409, message: 'El código de empleado ya está registrado' };
  }

  const newVendedor = { id: Date.now(), name, email, telefono, comision, codigoEmpleado };
  vendedores.push(newVendedor);
  
  return { status: 201, data: newVendedor };
}

// GET: Obtener todos los vendedores
function obtenerVendedores() {
  return { status: 200, data: vendedores };
}

// GET: Obtener un vendedor por ID
function obtenerVendedorPorId(id) {
  const vendedor = vendedores.find(v => v.id === Number(id));
  
  if (!vendedor) {
    return { status: 404, message: 'Vendedor no encontrado' };
  }

  return { status: 200, data: vendedor };
}

// PUT: Actualizar vendedor
function actualizarVendedor(id, body) {
  const vendedor = vendedores.find(v => v.id === Number(id));
  
  if (!vendedor) {
    return { status: 404, message: 'Vendedor no encontrado' };
  }

  if (body.email && body.email !== vendedor.email && vendedores.some(v => v.email === body.email)) {
    return { status: 409, message: 'El email ya está registrado por otro vendedor' };
  }

  if (body.codigoEmpleado && body.codigoEmpleado !== vendedor.codigoEmpleado && vendedores.some(v => v.codigoEmpleado === body.codigoEmpleado)) {
    return { status: 409, message: 'El código de empleado ya está registrado' };
  }

  if (body.email && !emailRegex.test(body.email)) {
    return { status: 400, message: 'El email no es válido' };
  }

  if (body.telefono && !phoneRegex.test(body.telefono)) {
    return { status: 400, message: 'El teléfono debe contener solo números y tener entre 7 y 15 dígitos' };
  }

  if (body.comision !== undefined && (isNaN(body.comision) || body.comision < 0 || body.comision > 100)) {
    return { status: 400, message: 'La comisión debe ser un número entre 0 y 100' };
  }

  Object.assign(vendedor, body);
  
  return { status: 200, data: vendedor };
}

// DELETE: Eliminar vendedor
function eliminarVendedor(id) {
  const index = vendedores.findIndex(v => v.id === Number(id));
  
  if (index === -1) {
    return { status: 404, message: 'Vendedor no encontrado' };
  }

  vendedores.splice(index, 1);
  
  return { status: 200, message: 'Vendedor eliminado exitosamente' };
}

// Exportar funciones para pruebas
module.exports = {
  crearVendedor,
  obtenerVendedores,
  obtenerVendedorPorId,
  actualizarVendedor,
  eliminarVendedor,
  vendedores
};

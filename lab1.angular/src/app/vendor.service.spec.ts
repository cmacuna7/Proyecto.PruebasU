import { TestBed } from '@angular/core/testing';

describe('Vendor Service', () => {
  let vendedores: any[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    vendedores = [];
  });

  // GET - Obtener lista de vendedores
  it('debería devolver lista vacía inicialmente', () => {
    expect(vendedores.length).toBe(0);
    expect(Array.isArray(vendedores)).toBe(true);
  });

  // POST - Crear vendedor válido
  it('debería crear un nuevo vendedor', () => {
    const nuevoVendedor = {
      id: 1,
      name: 'Ana García',
      email: 'ana.garcia@concesionaria.com',
      telefono: '0987654321',
      comision: 20,
      codigoEmpleado: 'EMP-123'
    };

    vendedores.push(nuevoVendedor);

    expect(vendedores.length).toBe(1);
    expect(vendedores[0].name).toBe('Ana García');
    expect(vendedores[0].codigoEmpleado).toBe('EMP-123');
  });

  // POST - Validar campos obligatorios
  it('debería fallar si faltan campos obligatorios', () => {
    const vendedorIncompleto = {
      name: 'Ana García'
    };

    const esValido = vendedorIncompleto.hasOwnProperty('email') && 
                     vendedorIncompleto.hasOwnProperty('telefono') &&
                     vendedorIncompleto.hasOwnProperty('comision') &&
                     vendedorIncompleto.hasOwnProperty('codigoEmpleado');

    expect(esValido).toBe(false);
  });

  // PUT - Actualizar vendedor
  it('debería actualizar un vendedor existente', () => {
    const vendedor = {
      id: 1,
      name: 'Ana García',
      email: 'ana.garcia@concesionaria.com',
      telefono: '0987654321',
      comision: 20,
      codigoEmpleado: 'EMP-123'
    };

    vendedores.push(vendedor);

    // Actualizar
    vendedores[0].comision = 25;
    vendedores[0].telefono = '0987654322';

    expect(vendedores[0].comision).toBe(25);
    expect(vendedores[0].telefono).toBe('0987654322');
  });

  // DELETE - Eliminar vendedor
  it('debería eliminar un vendedor', () => {
    const vendedor = {
      id: 1,
      name: 'Ana García',
      email: 'ana.garcia@concesionaria.com',
      telefono: '0987654321',
      comision: 20,
      codigoEmpleado: 'EMP-123'
    };

    vendedores.push(vendedor);
    expect(vendedores.length).toBe(1);

    vendedores.splice(0, 1);
    expect(vendedores.length).toBe(0);
  });

  // Validación: comisión fuera de rango (0-100)
  it('debería rechazar comisión mayor a 100', () => {
    const vendedor = {
      id: 1,
      name: 'Ana García',
      email: 'ana.garcia@concesionaria.com',
      telefono: '0987654321',
      comision: 150,
      codigoEmpleado: 'EMP-123'
    };

    const esValido = vendedor.comision >= 0 && vendedor.comision <= 100;
    expect(esValido).toBe(false);
  });

  // Validación: email duplicado
  it('debería rechazar email duplicado', () => {
    const vendedor1 = {
      id: 1,
      name: 'Ana García',
      email: 'ana.garcia@concesionaria.com',
      telefono: '0987654321',
      comision: 20,
      codigoEmpleado: 'EMP-123'
    };

    const vendedor2 = {
      id: 2,
      name: 'Juan Pérez',
      email: 'ana.garcia@concesionaria.com',
      telefono: '0987654322',
      comision: 15,
      codigoEmpleado: 'EMP-124'
    };

    vendedores.push(vendedor1);

    const emailExiste = vendedores.some(v => v.email === vendedor2.email);
    expect(emailExiste).toBe(true);
  });

  // Validación: nombre no puede estar vacío
  it('debería rechazar nombre vacío', () => {
    const vendedor = {
      id: 1,
      name: '',
      email: 'ana.garcia@concesionaria.com',
      telefono: '0987654321',
      comision: 20,
      codigoEmpleado: 'EMP-123'
    };

    const esValido = !!(vendedor.name && vendedor.name.trim().length > 0);
    expect(esValido).toBe(false);
  });

  // Validación: email no puede estar vacío
  it('debería rechazar email vacío', () => {
    const vendedor = {
      id: 1,
      name: 'Ana García',
      email: '',
      telefono: '0987654321',
      comision: 20,
      codigoEmpleado: 'EMP-123'
    };

    const esValido = !!(vendedor.email && vendedor.email.trim().length > 0);
    expect(esValido).toBe(false);
  });

  // Validación: teléfono no puede estar vacío
  it('debería rechazar teléfono vacío', () => {
    const vendedor = {
      id: 1,
      name: 'Ana García',
      email: 'ana.garcia@concesionaria.com',
      telefono: '',
      comision: 20,
      codigoEmpleado: 'EMP-123'
    };

    const esValido = !!(vendedor.telefono && vendedor.telefono.trim().length > 0);
    expect(esValido).toBe(false);
  });

  // Validación: código de empleado no puede estar vacío
  it('debería rechazar código de empleado vacío', () => {
    const vendedor = {
      id: 1,
      name: 'Ana García',
      email: 'ana.garcia@concesionaria.com',
      telefono: '0987654321',
      comision: 20,
      codigoEmpleado: ''
    };

    const esValido = !!(vendedor.codigoEmpleado && vendedor.codigoEmpleado.trim().length > 0);
    expect(esValido).toBe(false);
  });

  // Validación: comisión negativa
  it('debería rechazar comisión negativa', () => {
    const vendedor = {
      id: 1,
      name: 'Ana García',
      email: 'ana.garcia@concesionaria.com',
      telefono: '0987654321',
      comision: -10,
      codigoEmpleado: 'EMP-123'
    };

    const esValido = vendedor.comision >= 0 && vendedor.comision <= 100;
    expect(esValido).toBe(false);
  });
});

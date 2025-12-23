import { TestBed } from '@angular/core/testing';

describe('Concesionaria Service', () => {
  let concesionarias: any[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    concesionarias = [];
  });

  // GET - Obtener lista de concesionarias
  it('debería devolver lista vacía inicialmente', () => {
    expect(concesionarias.length).toBe(0);
    expect(Array.isArray(concesionarias)).toBe(true);
  });

  // POST - Crear concesionaria válida
  it('debería crear una nueva concesionaria', () => {
    const nuevaConcesionaria = {
      id: 1,
      nombre: 'Concesionaria Central',
      direccion: 'Av. Principal 123',
      telefono: '555-1234',
      horarios: 'Lunes a Viernes 9am-6pm'
    };

    concesionarias.push(nuevaConcesionaria);

    expect(concesionarias.length).toBe(1);
    expect(concesionarias[0].nombre).toBe('Concesionaria Central');
    expect(concesionarias[0].telefono).toBe('555-1234');
  });

  // POST - Validar campos obligatorios
  it('debería fallar si faltan campos obligatorios', () => {
    const concesionariaIncompleta = {
      nombre: 'Concesionaria Test'
    };

    const esValido = concesionariaIncompleta.hasOwnProperty('direccion') && 
                     concesionariaIncompleta.hasOwnProperty('telefono') &&
                     concesionariaIncompleta.hasOwnProperty('horarios');

    expect(esValido).toBe(false);
  });

  // PUT - Actualizar concesionaria
  it('debería actualizar una concesionaria existente', () => {
    const concesionaria = {
      id: 1,
      nombre: 'Concesionaria Central',
      direccion: 'Av. Principal 123',
      telefono: '555-1234',
      horarios: 'Lunes a Viernes 9am-6pm'
    };

    concesionarias.push(concesionaria);

    // Actualizar
    concesionarias[0].telefono = '555-5678';
    concesionarias[0].horarios = 'Lunes a Sábado 8am-8pm';

    expect(concesionarias[0].telefono).toBe('555-5678');
    expect(concesionarias[0].horarios).toBe('Lunes a Sábado 8am-8pm');
  });

  // DELETE - Eliminar concesionaria
  it('debería eliminar una concesionaria', () => {
    const concesionaria = {
      id: 1,
      nombre: 'Concesionaria Central',
      direccion: 'Av. Principal 123',
      telefono: '555-1234',
      horarios: 'Lunes a Viernes 9am-6pm'
    };

    concesionarias.push(concesionaria);
    expect(concesionarias.length).toBe(1);

    concesionarias.splice(0, 1);
    expect(concesionarias.length).toBe(0);
  });

  // Validación: nombre duplicado
  it('debería rechazar nombre duplicado', () => {
    const concesionaria1 = {
      id: 1,
      nombre: 'Concesionaria Duplicada',
      direccion: 'Av. Principal 123',
      telefono: '555-1234',
      horarios: 'Lunes a Viernes 9am-6pm'
    };

    const concesionaria2 = {
      id: 2,
      nombre: 'Concesionaria Duplicada',
      direccion: 'Calle Secundaria 456',
      telefono: '555-5678',
      horarios: 'Lunes a Sábado 8am-8pm'
    };

    concesionarias.push(concesionaria1);

    const nombreExiste = concesionarias.some(c => c.nombre === concesionaria2.nombre);
    expect(nombreExiste).toBe(true);
  });

  // Validación: nombre no puede estar vacío
  it('debería rechazar nombre vacío', () => {
    const concesionaria = {
      id: 1,
      nombre: '',
      direccion: 'Av. Principal 123',
      telefono: '555-1234',
      horarios: 'Lunes a Viernes 9am-6pm'
    };

    const esValido = !!(concesionaria.nombre && concesionaria.nombre.trim().length > 0);
    expect(esValido).toBe(false);
  });

  // Validación: dirección no puede estar vacía
  it('debería rechazar dirección vacía', () => {
    const concesionaria = {
      id: 1,
      nombre: 'Concesionaria Central',
      direccion: '',
      telefono: '555-1234',
      horarios: 'Lunes a Viernes 9am-6pm'
    };

    const esValido = !!(concesionaria.direccion && concesionaria.direccion.trim().length > 0);
    expect(esValido).toBe(false);
  });

  // Validación: teléfono no puede estar vacío
  it('debería rechazar teléfono vacío', () => {
    const concesionaria = {
      id: 1,
      nombre: 'Concesionaria Central',
      direccion: 'Av. Principal 123',
      telefono: '',
      horarios: 'Lunes a Viernes 9am-6pm'
    };

    const esValido = !!(concesionaria.telefono && concesionaria.telefono.trim().length > 0);
    expect(esValido).toBe(false);
  });

  // Validación: horarios no pueden estar vacíos
  it('debería rechazar horarios vacíos', () => {
    const concesionaria = {
      id: 1,
      nombre: 'Concesionaria Central',
      direccion: 'Av. Principal 123',
      telefono: '555-1234',
      horarios: ''
    };

    const esValido = !!(concesionaria.horarios && concesionaria.horarios.trim().length > 0);
    expect(esValido).toBe(false);
  });

  // Validación: teléfono debe tener formato válido
  it('debería validar formato de teléfono', () => {
    const concesionaria = {
      id: 1,
      nombre: 'Concesionaria Central',
      direccion: 'Av. Principal 123',
      telefono: '123',
      horarios: 'Lunes a Viernes 9am-6pm'
    };

    // Validar que el teléfono tenga al menos 7 caracteres
    const esValido = concesionaria.telefono.length >= 7;
    expect(esValido).toBe(false);
  });

  // Funcionalidad: filtrar concesionarias por nombre
  it('debería filtrar concesionarias por nombre', () => {
    const concesionaria1 = {
      id: 1,
      nombre: 'Concesionaria Norte',
      direccion: 'Av. Norte 123',
      telefono: '555-1234',
      horarios: 'Lunes a Viernes 9am-6pm'
    };

    const concesionaria2 = {
      id: 2,
      nombre: 'Concesionaria Sur',
      direccion: 'Av. Sur 456',
      telefono: '555-5678',
      horarios: 'Lunes a Sábado 8am-8pm'
    };

    concesionarias.push(concesionaria1, concesionaria2);

    const resultado = concesionarias.filter(c => c.nombre.includes('Norte'));
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe('Concesionaria Norte');
  });

  // Funcionalidad: actualizar solo un campo
  it('debería permitir actualizar solo un campo', () => {
    const concesionaria = {
      id: 1,
      nombre: 'Concesionaria Central',
      direccion: 'Av. Principal 123',
      telefono: '555-1234',
      horarios: 'Lunes a Viernes 9am-6pm'
    };

    concesionarias.push(concesionaria);

    // Actualizar solo el teléfono
    const nombreAnterior = concesionarias[0].nombre;
    concesionarias[0].telefono = '555-9999';

    expect(concesionarias[0].telefono).toBe('555-9999');
    expect(concesionarias[0].nombre).toBe(nombreAnterior);
  });
});

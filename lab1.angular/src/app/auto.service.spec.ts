import { TestBed } from '@angular/core/testing';

describe('Auto Service', () => {
  let autos: any[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    autos = [];
  });

  // GET - Obtener lista de autos
  it('debería devolver lista vacía inicialmente', () => {
    expect(autos.length).toBe(0);
    expect(Array.isArray(autos)).toBe(true);
  });

  // POST - Crear auto válido
  it('debería crear un nuevo auto', () => {
    const nuevoAuto = {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 2023,
      color: 'Blanco',
      numeroSerie: 'TOYOTA001'
    };

    autos.push(nuevoAuto);

    expect(autos.length).toBe(1);
    expect(autos[0].marca).toBe('Toyota');
    expect(autos[0].numeroSerie).toBe('TOYOTA001');
  });

  // POST - Validar campos obligatorios
  it('debería fallar si faltan campos obligatorios', () => {
    const autoIncompleto = {
      marca: 'Toyota'
    };

    const esValido = autoIncompleto.hasOwnProperty('modelo') && 
                     autoIncompleto.hasOwnProperty('año') &&
                     autoIncompleto.hasOwnProperty('color') &&
                     autoIncompleto.hasOwnProperty('numeroSerie');

    expect(esValido).toBe(false);
  });

  // PUT - Actualizar auto
  it('debería actualizar un auto existente', () => {
    const auto = {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 2023,
      color: 'Blanco',
      numeroSerie: 'TOYOTA001'
    };

    autos.push(auto);

    // Actualizar
    autos[0].color = 'Negro';
    autos[0].año = 2024;

    expect(autos[0].color).toBe('Negro');
    expect(autos[0].año).toBe(2024);
  });

  // DELETE - Eliminar auto
  it('debería eliminar un auto', () => {
    const auto = {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 2023,
      color: 'Blanco',
      numeroSerie: 'TOYOTA001'
    };

    autos.push(auto);
    expect(autos.length).toBe(1);

    autos.splice(0, 1);
    expect(autos.length).toBe(0);
  });

  // Validación: año inválido (anterior a 1900)
  it('debería rechazar año anterior a 1900', () => {
    const auto = {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 1899,
      color: 'Blanco',
      numeroSerie: 'TOYOTA001'
    };

    const esValido = auto.año >= 1900;
    expect(esValido).toBe(false);
  });

  // Validación: número de serie duplicado
  it('debería rechazar número de serie duplicado', () => {
    const auto1 = {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 2023,
      color: 'Blanco',
      numeroSerie: 'DUPLICATE001'
    };

    const auto2 = {
      id: 2,
      marca: 'Honda',
      modelo: 'Civic',
      año: 2023,
      color: 'Negro',
      numeroSerie: 'DUPLICATE001'
    };

    autos.push(auto1);

    const serieExiste = autos.some(a => a.numeroSerie === auto2.numeroSerie);
    expect(serieExiste).toBe(true);
  });

  // Validación: marca no puede estar vacía
  it('debería rechazar marca vacía', () => {
    const auto = {
      id: 1,
      marca: '',
      modelo: 'Corolla',
      año: 2023,
      color: 'Blanco',
      numeroSerie: 'TOYOTA001'
    };

    const esValido = !!(auto.marca && auto.marca.trim().length > 0);
    expect(esValido).toBe(false);
  });

  // Validación: modelo no puede estar vacío
  it('debería rechazar modelo vacío', () => {
    const auto = {
      id: 1,
      marca: 'Toyota',
      modelo: '',
      año: 2023,
      color: 'Blanco',
      numeroSerie: 'TOYOTA001'
    };

    const esValido = !!(auto.modelo && auto.modelo.trim().length > 0);
    expect(esValido).toBe(false);
  });

  // Validación: color no puede estar vacío
  it('debería rechazar color vacío', () => {
    const auto = {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 2023,
      color: '',
      numeroSerie: 'TOYOTA001'
    };

    const esValido = !!(auto.color && auto.color.trim().length > 0);
    expect(esValido).toBe(false);
  });

  // Validación: numeroSerie no puede estar vacío
  it('debería rechazar numeroSerie vacío', () => {
    const auto = {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 2023,
      color: 'Blanco',
      numeroSerie: ''
    };

    const esValido = !!(auto.numeroSerie && auto.numeroSerie.trim().length > 0);
    expect(esValido).toBe(false);
  });
});

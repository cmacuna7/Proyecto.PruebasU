const request = require('supertest');
const app = require('../src/app.js');

describe('API de Autos', () => {
  // GET
  test('GET /api/autos debería devolver lista vacía inicialmente', async () => {
    const res = await request(app).get('/api/autos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  // POST
  test('POST /api/autos debería crear un nuevo auto', async () => {
    const nuevoAuto = {
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 2020,
      color: 'Blanco',
      numeroSerie: '1HGCM82633A004352'
    };

    const res = await request(app).post('/api/autos').send(nuevoAuto);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.marca).toBe('Toyota');
    expect(res.body.modelo).toBe('Corolla');
  });

  // POST: datos inválidos
  test('POST /api/autos debería rechazar datos inválidos', async () => {
    const res = await request(app).post('/api/autos').send({ marca: 'Ford' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Marca, Modelo, Año, Color y Número de Serie son requeridos');
  });

  // PUT
  test('PUT /api/autos/:id debería actualizar un auto existente', async () => {
    const auto = {
      marca: 'Honda',
      modelo: 'Civic',
      año: 2018,
      color: 'Rojo',
      numeroSerie: 'JH4KA8260MC000000'
    };

    const creado = await request(app).post('/api/autos').send(auto);
    const id = creado.body.id;

    const actualizado = await request(app)
      .put(`/api/autos/${id}`)
      .send({ color: 'Negro' });

    expect(actualizado.statusCode).toBe(200);
    expect(actualizado.body.color).toBe('Negro');
  });

  // DELETE
  test('DELETE /api/autos/:id debería eliminar un auto', async () => {
    const auto = {
      marca: 'Ford',
      modelo: 'Focus',
      año: 2015,
      color: 'Azul',
      numeroSerie: '1FAHP3F20CL000000'
    };

    const creado = await request(app).post('/api/autos').send(auto);
    const id = creado.body.id;

    const eliminado = await request(app).delete(`/api/autos/${id}`);
    expect(eliminado.statusCode).toBe(200);
    expect(eliminado.body.marca).toBe('Ford');

    const res = await request(app).get('/api/autos');
    expect(res.body.find(a => a.id === id)).toBeUndefined();
  });
});

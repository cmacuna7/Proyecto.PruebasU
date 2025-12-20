const request = require('supertest');
const app = require('../src/app.js');

let token;

describe('API de Autos', () => {
  // Obtener token antes de los tests
  beforeAll(async () => {
    const loginRes = await request(app).post('/api/auth/login').set('Authorization', `Bearer ${token}`).send({
      email: 'admin@consecionaria.com',
      password: 'consesionariachida'
    });
    token = loginRes.body.token;
  });

  // GET - Obtener lista de autos
  test('GET /autos debería devolver lista vacía al inicio', async () => {
    const res = await request(app).get('/autos').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST - Crear auto válido
  test('POST /autos debería crear un nuevo auto', async () => {
    const nuevoAuto = {
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 2023,
      color: 'Blanco',
      numeroSerie: 'TOYOTA001'
    };

    const res = await request(app).post('/autos').set('Authorization', `Bearer ${token}`).send(nuevoAuto);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.marca).toBe('Toyota');
    expect(res.body.numeroSerie).toBe('TOYOTA001');
  });

  // POST - Validar campos obligatorios
  test('POST /autos debería rechazar auto sin marca', async () => {
    const res = await request(app).post('/autos').set('Authorization', `Bearer ${token}`).send({
      modelo: 'Corolla',
      año: 2023,
      color: 'Blanco',
      numeroSerie: 'SERIE001'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  // POST - Validar año válido
  test('POST /autos debería rechazar año inválido', async () => {
    const res = await request(app).post('/autos').set('Authorization', `Bearer ${token}`).send({
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 1800,
      color: 'Blanco',
      numeroSerie: 'INVALID_YEAR'
    });
    expect(res.statusCode).toBe(400);
  });

  // POST - Validar número de serie único
  test('POST /autos debería rechazar número de serie duplicado', async () => {
    const auto = {
      marca: 'Honda',
      modelo: 'Civic',
      año: 2023,
      color: 'Negro',
      numeroSerie: 'UNIQUE123'
    };

    await request(app).post('/autos').set('Authorization', `Bearer ${token}`).send(auto);
    
    const res = await request(app).post('/autos').set('Authorization', `Bearer ${token}`).send(auto);
    expect(res.statusCode).toBe(400);
  });

  // PUT - Actualizar campo específico
  test('PUT /autos/:id debería actualizar un campo del auto', async () => {
    const auto = {
      marca: 'Ford',
      modelo: 'Mustang',
      año: 2022,
      color: 'Rojo',
      numeroSerie: 'FORD001'
    };

    const creado = await request(app).post('/autos').set('Authorization', `Bearer ${token}`).send(auto);
    const id = creado.body.id;

    const res = await request(app)
      .put(`/autos/${id}`).set('Authorization', `Bearer ${token}`)
      .send({ color: 'Azul' });

    expect(res.statusCode).toBe(200);
    expect(res.body.color).toBe('Azul');
    expect(res.body.modelo).toBe('Mustang');
  });

  // PUT - Actualizar todos los campos
  test('PUT /autos/:id debería actualizar todos los campos', async () => {
    const auto = {
      marca: 'BMW',
      modelo: '3 Series',
      año: 2020,
      color: 'Gris',
      numeroSerie: 'BMW001'
    };

    const creado = await request(app).post('/autos').set('Authorization', `Bearer ${token}`).send(auto);
    const id = creado.body.id;

    const cambios = {
      marca: 'Mercedes',
      modelo: 'C-Class',
      año: 2024,
      color: 'Negro',
      numeroSerie: 'MERC001'
    };

    const res = await request(app).put(`/autos/${id}`).set('Authorization', `Bearer ${token}`).send(cambios);
    expect(res.statusCode).toBe(200);
    expect(res.body.marca).toBe('Mercedes');
    expect(res.body.año).toBe(2024);
  });

  // PUT - Validar año en actualización
  test('PUT /autos/:id debería rechazar año inválido en actualización', async () => {
    const auto = {
      marca: 'Nissan',
      modelo: 'Sentra',
      año: 2021,
      color: 'Blanco',
      numeroSerie: 'NISS001'
    };

    const creado = await request(app).post('/autos').set('Authorization', `Bearer ${token}`).send(auto);
    const id = creado.body.id;

    const res = await request(app)
      .put(`/autos/${id}`).set('Authorization', `Bearer ${token}`)
      .send({ año: 1800 });

    expect(res.statusCode).toBe(400);
  });

  // PUT - Auto no encontrado
  test('PUT /autos/:id debería retornar 404 si auto no existe', async () => {
    const res = await request(app)
      .put('/autos/999999999').set('Authorization', `Bearer ${token}`)
      .send({ color: 'Verde' });

    expect(res.statusCode).toBe(404);
  });

  // DELETE - Eliminar auto exitosamente
  test('DELETE /autos/:id debería eliminar un auto', async () => {
    const auto = {
      marca: 'Volkswagen',
      modelo: 'Golf',
      año: 2023,
      color: 'Plata',
      numeroSerie: 'VW001'
    };

    const creado = await request(app).post('/autos').set('Authorization', `Bearer ${token}`).send(auto);
    const id = creado.body.id;

    const eliminado = await request(app).delete(`/autos/${id}`).set('Authorization', `Bearer ${token}`);
    expect(eliminado.statusCode).toBe(200);
    expect(eliminado.body.marca).toBe('Volkswagen');

    const res = await request(app).get('/autos').set('Authorization', `Bearer ${token}`);
    expect(res.body.find(a => a.id === id)).toBeUndefined();
  });

  // DELETE - Auto no encontrado
  test('DELETE /autos/:id debería retornar 404 si auto no existe', async () => {
    const res = await request(app).delete('/autos/999999999').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});


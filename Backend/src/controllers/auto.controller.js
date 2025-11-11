// {
//    id
//    marca
//    modelo
//    año
//    color
//    numeroSerie
// }
// soporta atributos en inglés y español:
// inglés:  { make, model, year, color, vin }
// español: { marca, modelo, anio / año, color, placa / numeroSerie }
const autos = [];

// GET
function getAllPatients(req, res) {
  res.json(autos);
}

// POST
function addnewPatient(req, res) {
  const { marca, modelo, año, color, numeroSerie } = req.body;

  // Validación básica de entrada (mensaje en español)
  if (!marca || !modelo || !año || !color || !numeroSerie) {
    return res.status(400).json({ message: 'Marca, Modelo, Año, Color y Número de Serie son requeridos' });
  }

  // Creamos un objeto auto (propiedades en español)
  const newAuto = {
    id: Date.now(), // ID simulado
    marca,
    modelo,
    año,
    color,
    numeroSerie
  };

  // Lo añadimos al arreglo de autos
  autos.push(newAuto);

  // Respondemos con el auto creado
  res.status(201).json(newAuto);
}

// PUT
function updatePatient(req, res) {
  const { id } = req.params;
  const { marca, modelo, año, color, numeroSerie } = req.body;

  const i = autos.findIndex(a => a.id == id);
  if (i === -1) return res.status(404).json({ message: 'Auto no encontrado' });

  if (marca !== undefined) autos[i].marca = marca;
  if (modelo !== undefined) autos[i].modelo = modelo;
  if (año !== undefined) autos[i].año = año;
  if (color !== undefined) autos[i].color = color;
  if (numeroSerie !== undefined) autos[i].numeroSerie = numeroSerie;

  res.json(autos[i]);
}

// DELETE
function deletePatient(req, res) {
  const { id } = req.params;
  
  const index = autos.findIndex(a => a.id == id);
  if (index === -1) return res.status(404).json({ message: 'Auto no encontrado' });

  const deleted = autos.splice(index, 1);

  res.json(deleted[0]);
}

module.exports = { getAllPatients, addnewPatient, updatePatient, deletePatient };

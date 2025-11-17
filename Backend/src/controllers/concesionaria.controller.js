// Modelo Concesionaria con 5 atributos:
// {
//    id
//    nombre
//    direccion
//    telefono
//    ciudad
//    gerente
// }

const concesionarias = [];

// GET - Obtener todas las concesionarias
function getAllConcesionarias(req, res) {
    res.json(concesionarias);
}

// POST - Crear una nueva concesionaria
function addNewConcesionaria(req, res) {
    const { nombre, direccion, telefono, ciudad, gerente } = req.body;

    // Validación básica de entrada
    if (!nombre || !direccion || !telefono || !ciudad || !gerente) {
        return res.status(400).json({ 
            message: 'Nombre, Dirección, Teléfono, Ciudad y Gerente son requeridos' 
        });
    }

    // Validación de campos vacíos (solo espacios)
    if (nombre.trim() === '' || direccion.trim() === '' || telefono.trim() === '' || 
        ciudad.trim() === '' || gerente.trim() === '') {
        return res.status(400).json({ 
            message: 'Los campos no pueden estar vacíos o contener solo espacios' 
        });
    }

    // Creamos un objeto concesionaria
    const newConcesionaria = {
        id: Date.now(), // ID usando Date.now()
        nombre,
        direccion,
        telefono,
        ciudad,
        gerente
    };

    // Lo añadimos al arreglo de concesionarias
    concesionarias.push(newConcesionaria);

    // Respondemos con la concesionaria creada
    res.status(201).json(newConcesionaria);
}

// PUT - Actualizar una concesionaria existente
function updateConcesionaria(req, res) {
    const { id } = req.params;
    const { nombre, direccion, telefono, ciudad, gerente } = req.body;

    const i = concesionarias.findIndex(c => c.id == id);
    if (i === -1) return res.status(404).json({ message: 'Concesionaria no encontrada' });

    if (nombre !== undefined) concesionarias[i].nombre = nombre;
    if (direccion !== undefined) concesionarias[i].direccion = direccion;
    if (telefono !== undefined) concesionarias[i].telefono = telefono;
    if (ciudad !== undefined) concesionarias[i].ciudad = ciudad;
    if (gerente !== undefined) concesionarias[i].gerente = gerente;

    res.json(concesionarias[i]);
}

// DELETE - Eliminar una concesionaria
function deleteConcesionaria(req, res) {
    const { id } = req.params;
  
    const index = concesionarias.findIndex(c => c.id == id);
    if (index === -1) return res.status(404).json({ message: 'Concesionaria no encontrada' });

    const deleted = concesionarias.splice(index, 1);

    res.json(deleted[0]);
}

module.exports = { 
    getAllConcesionarias, 
    addNewConcesionaria, 
    updateConcesionaria, 
    deleteConcesionaria 
};

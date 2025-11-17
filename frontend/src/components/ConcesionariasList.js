import React from "react";

function ConcesionariasList({ concesionarias, onEliminar, onEditar }) {
  return (
    <div>
      <h2>Concesionarias Registradas</h2>
      {concesionarias.length === 0 ? (
        <p>No hay concesionarias registradas.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ width: "100%", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
              <th>Gerente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {concesionarias.map((concesionaria) => (
              <tr key={concesionaria.id}>
                <td>{concesionaria.id}</td>
                <td>{concesionaria.nombre}</td>
                <td>{concesionaria.direccion}</td>
                <td>{concesionaria.telefono}</td>
                <td>{concesionaria.ciudad}</td>
                <td>{concesionaria.gerente}</td>
                <td>
                  <button onClick={() => onEditar(concesionaria)}>Editar</button>{" "}
                  <button onClick={() => onEliminar(concesionaria.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ConcesionariasList;

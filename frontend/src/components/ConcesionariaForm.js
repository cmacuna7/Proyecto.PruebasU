import React, { useState, useEffect } from "react";

function ConcesionariaForm({ onGuardar, editConcesionaria, onCancelEdit }) {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    ciudad: "",
    gerente: "",
  });

  useEffect(() => {
    if (editConcesionaria) {
      setForm(editConcesionaria);
    }
  }, [editConcesionaria]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envía los datos
    onGuardar(form);

    // Limpia el formulario
    setForm({
      nombre: "",
      direccion: "",
      telefono: "",
      ciudad: "",
      gerente: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editConcesionaria ? "Editar Concesionaria" : "Nueva Concesionaria"}</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px", width: "200px" }}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px", width: "300px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={form.ciudad}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          name="gerente"
          placeholder="Gerente"
          value={form.gerente}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px", width: "200px" }}
        />
      </div>
      <button type="submit">{editConcesionaria ? "Actualizar" : "Guardar"}</button>

      {editConcesionaria && (
        <button
          type="button"
          onClick={onCancelEdit}
          style={{ marginLeft: "10px" }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

export default ConcesionariaForm;

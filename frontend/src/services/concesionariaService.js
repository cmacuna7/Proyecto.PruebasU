// URL base del backend para concesionarias
const API_URL = "http://localhost:3000/api/concesionarias";

/**
 * Obtener todas las concesionarias
 */
export const obtenerTodasLasConcesionarias = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener concesionarias");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerTodasLasConcesionarias:", error);
    throw error;
  }
};

/**
 * Crear una nueva concesionaria
 */
export const crearConcesionaria = async (concesionaria) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(concesionaria),
    });
    if (!response.ok) {
      throw new Error("Error al crear la concesionaria");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en crearConcesionaria:", error);
    throw error;
  }
};

/**
 * Actualizar una concesionaria existente
 */
export const actualizarConcesionaria = async (id, concesionaria) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(concesionaria),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la concesionaria");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en actualizarConcesionaria:", error);
    throw error;
  }
};

/**
 * Eliminar una concesionaria
 */
export const eliminarConcesionaria = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la concesionaria");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en eliminarConcesionaria:", error);
    throw error;
  }
};

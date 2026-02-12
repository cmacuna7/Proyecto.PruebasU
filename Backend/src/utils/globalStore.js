// Global memory store for Vercel serverless functions
// This will persist better across function invocations

const globalThis = global;

// Initialize global stores if they don't exist
if (!globalThis.vendedores) {
    globalThis.vendedores = [
        { id: 1, name: 'Juan Perez', email: 'juan@empresa.com', telefono: '1234567890', comision: 5, codigoEmpleado: 'EMP001' },
        { id: 2, name: 'Maria Lopez', email: 'maria@empresa.com', telefono: '0987654321', comision: 7, codigoEmpleado: 'EMP002' }
    ];
    globalThis.vendorIdCounter = 100;
}

if (!globalThis.clientes) {
    globalThis.clientes = [
        { id: 1, nombre: 'Carlos Rodriguez', email: 'carlos@cliente.com', telefono: '5551234567', direccion: 'Calle 123', ciudad: 'Quito' },
        { id: 2, nombre: 'Ana Martinez', email: 'ana@cliente.com', telefono: '5559876543', direccion: 'Av Principal 456', ciudad: 'Guayaquil' }
    ];
    globalThis.clienteIdCounter = 100;
}

if (!globalThis.autos) {
    globalThis.autos = [
        { id: 1, marca: 'Toyota', modelo: 'Corolla', año: 2023, color: 'Blanco', numeroSerie: 'TOY001' },
        { id: 2, marca: 'Honda', modelo: 'Civic', año: 2024, color: 'Negro', numeroSerie: 'HON001' }
    ];
    globalThis.autoIdCounter = 100;
}

if (!globalThis.concesionarias) {
    globalThis.concesionarias = [
        { id: 1, nombre: 'AutoVentas Central', direccion: 'Av. Amazonas 123', telefono: '0987654321', ciudad: 'Quito', gerente: 'Roberto Silva' },
        { id: 2, nombre: 'Autos del Pacifico', direccion: 'Malecón 456', telefono: '0912345678', ciudad: 'Guayaquil', gerente: 'Patricia Ruiz' }
    ];
    globalThis.concesionariaIdCounter = 100;
}

module.exports = {
    getVendedores: () => globalThis.vendedores,
    getVendorIdCounter: () => globalThis.vendorIdCounter++,
    getClientes: () => globalThis.clientes, 
    getClienteIdCounter: () => globalThis.clienteIdCounter++,
    getAutos: () => globalThis.autos,
    getAutoIdCounter: () => globalThis.autoIdCounter++,
    getConcesionarias: () => globalThis.concesionarias,
    getConcesionariaIdCounter: () => globalThis.concesionariaIdCounter++
};
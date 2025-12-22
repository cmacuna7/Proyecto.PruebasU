export class Concesionaria {
    id?: number;
    nombre: string;
    direccion: string;
    telefono: string;
    ciudad: string;
    gerente: string;

    constructor(nombre: string, direccion: string, telefono: string, ciudad: string, gerente: string) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.ciudad = ciudad;
        this.gerente = gerente;
    }
}

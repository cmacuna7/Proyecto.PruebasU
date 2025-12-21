export class Cliente {
    id?: number;
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    ciudad: string;

    constructor(
        nombre: string = '',
        email: string = '',
        telefono: string = '',
        direccion: string = '',
        ciudad: string = ''
    ) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.ciudad = ciudad;
    }


}

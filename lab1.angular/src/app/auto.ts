export class Auto {
    id?: number;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
    numeroSerie: string;

    constructor(marca: string, modelo: string, anio: number, color: string, numeroSerie: string) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.color = color;
        this.numeroSerie = numeroSerie;
    }
}

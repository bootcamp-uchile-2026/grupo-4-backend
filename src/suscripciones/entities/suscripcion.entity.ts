import { randomUUID } from "crypto";

export class Suscripcion {
    id?: string;
    descripcion: string;
    nombre: string;
    precio: number;
    productosId: string[];
    activa: boolean;

    constructor(
        descripcion: string,
        nombre: string,
        precio: number,
        productosId: string[],
    ) {
        this.id = randomUUID();
        this.descripcion = descripcion;
        this.nombre = nombre;
        this.precio = precio;
        this.productosId = productosId;
        this.activa = true;

    }
}

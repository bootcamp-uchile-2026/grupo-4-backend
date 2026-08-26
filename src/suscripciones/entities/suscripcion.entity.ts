import { randomUUID } from "crypto";

export class Suscripcion {
    id?: number;
    descripcion: string;
    nombre: string;
    precio: number;
    productosId: number[];
    activa: boolean;

    constructor(self,
        descripcion: string,
        nombre: string,
        precio: number,
        productosId: number[],
    ) {
        self.id = randomUUID();
        self.descripcion = descripcion;
        self.nombre = nombre;
        self.precio = precio;
        self.productosId = productosId;
        self.activa = true;

    }
}

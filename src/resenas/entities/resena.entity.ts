import { randomUUID } from "crypto";

export class Resena {
    id?: number;
    clienteId: number;
    productoId: number;
    titulo: string;
    detalle: string;
    estrellas: string;

    constructor(
        self,
        clienteId: number,
        productoId: number,
        titulo: string,
        detalle: string,
        estrellas: string
    ) {
        self.id = randomUUID();
        self.clienteId = clienteId;
        self.productoId = productoId;
        self.titulo = titulo;
        self.detalle = detalle;
        self.estrellas = estrellas;
    }
}

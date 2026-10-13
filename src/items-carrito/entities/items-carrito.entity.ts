import { ItemCarrito } from './item-carrito.entity';

export class ItemsCarrito {

    public id: string;
    public nombre: string;
    public items: ItemCarrito[];
    public cantidad: number;
    public precio: number;
    public creadoEn: Date;
    public actualizadoEn: Date;
}

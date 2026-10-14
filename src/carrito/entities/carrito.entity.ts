import { CartItem } from "./cart-item.entity";

export class Carrito {
  constructor(
    public id: number,
    public usuarioId: number,
    public items: CartItem[],
    public totalItems: number,
    public totalPrice: number,
  ) {}
}
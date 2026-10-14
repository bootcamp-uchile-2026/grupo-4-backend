export class CartItem {
  constructor(
    public itemId: number,
    public itemName: string,
    public unitPrice: number,
    public quantity: number,
    public subtotal: number,
  ) {}
}
export class Proveedor {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public email: string,
    public telefono: string,
    public password: string,
  ) {}
}
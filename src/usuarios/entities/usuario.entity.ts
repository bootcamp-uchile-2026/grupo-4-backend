export class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public email: string,
    public telefono: string,
    public password: string
  ) {}
}
export class Usuario {
  constructor(
    public id: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public telefono: string,
    public password: string
  ) {}
}
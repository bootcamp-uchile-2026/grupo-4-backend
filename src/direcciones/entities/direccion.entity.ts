export class Direccion {
  constructor(
    public id: number,
    public calle: string,
    public numero: string,
    public comuna: string,
    public ciudad: string,
    public region: string,
  ){}
}
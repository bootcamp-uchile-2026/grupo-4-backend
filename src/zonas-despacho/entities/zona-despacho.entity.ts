export class ZonaDespacho {
  constructor(
    public id: string,
    public nombre: string,
    public comunas: string[],
    public costoEnvio: number,
    public activa: boolean,
  ) {}
}

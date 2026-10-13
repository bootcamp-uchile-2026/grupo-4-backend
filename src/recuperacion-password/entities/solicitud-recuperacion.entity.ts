export class SolicitudRecuperacion {
  constructor(
    public id: string,
    public email: string,
    public token: string,
    public expiraEn: Date,
    public usada: boolean,
  ) {}
}

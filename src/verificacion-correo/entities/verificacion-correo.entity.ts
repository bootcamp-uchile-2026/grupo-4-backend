export class VerificacionCorreo {
  constructor(
    public id: string,
    public email: string,
    public token: string,
    public expiraEn: Date,
    public verificado: boolean,
  ) {}
}

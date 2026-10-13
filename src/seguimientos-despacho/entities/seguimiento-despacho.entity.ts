import { EstadoSeguimiento } from '../enums/estado-seguimiento.enum';

export class SeguimientoDespacho {
  constructor(
    public id: string,
    public despachoId: string,
    public estado: EstadoSeguimiento,
    public descripcion: string,
    public fecha: Date,
  ) {}
}

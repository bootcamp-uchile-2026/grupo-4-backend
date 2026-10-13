import { EstadoDespacho } from '../enums/estado-despacho.enum';

export class Despacho {
  constructor(
    public id: string,
    public pedidoId: string,
    public direccionId: string,
    public zonaId: string,
    public estado: EstadoDespacho,
  ) {}
}

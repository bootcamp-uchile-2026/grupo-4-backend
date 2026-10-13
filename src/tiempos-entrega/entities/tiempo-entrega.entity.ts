export class TiempoEntrega {
  constructor(
    public id: string,
    public zonaId: string,
    public diasMinimo: number,
    public diasMaximo: number,
  ) {}
}

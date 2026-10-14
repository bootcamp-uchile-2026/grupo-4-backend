export class DatosDespacho {

    public id: number;
    public usuarioId: number;
    public nombreReceptor: string;
    public telefono: string;
    public calle: string;
    public numero: string;
    public comuna: string;
    public ciudad: string;
    public region: string;
    public instrucciones: string | null;
    public esPredeterminado: boolean;
    public creadoEn: Date;
    public actualizadoEn: Date;
}

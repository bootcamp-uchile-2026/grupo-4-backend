import { MarcaTarjeta } from "../enum/metodos-pago.enum";

export class MetodosPago {

    public id: string;
    public usuarioId: string;
    public marca: MarcaTarjeta;
    public numero: string;
    public fechaExpiracion: string;
    public cvv: string;
    public creadoEn: Date;
    public actualizadoEn: Date;
}

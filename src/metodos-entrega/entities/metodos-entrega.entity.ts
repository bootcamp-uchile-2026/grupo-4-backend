import { TipoConservacion } from 'src/productos/enums/tipo-conservacion.enum';
import { TipoEntrega } from '../enum/tipos-entrega.enum';

export class MetodosEntrega {

    public id: number;
    public nombre: string;
    public descripcion: string | null;
    public tipo: TipoEntrega;
    public costo: number;
    public costoGratisDesde: number | null;
    public diasEstimadosMin: number;
    public diasEstimadosMax: number;
    public tiposConservacionPermitidos: TipoConservacion[];
    public comunasCobertura: string[] | null;
    public activo: boolean;
    public creadoEn: Date;
    public actualizadoEn: Date | null;
}

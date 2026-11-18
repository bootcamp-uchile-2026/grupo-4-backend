import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

export type CarpetaImagen = 'productos' | 'proveedores';

@Injectable()
export class ArchivosService {
  private readonly directorioBase = resolve(process.cwd(), 'uploads');

  private readonly tamanoMaximo = 5 * 1024 * 1024;

  private readonly extensionesPermitidas = new Map<string, string>([
    ['image/jpeg', '.jpg'],
    ['image/png', '.png'],
    ['image/webp', '.webp'],
  ]);

  private detectarMimeType(buffer: Buffer): string | null {
    if (
      buffer.length >= 3 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff
    ) {
      return 'image/jpeg';
    }

    if (
      buffer.length >= 8 &&
      buffer.subarray(0, 8).equals(
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      )
    ) {
      return 'image/png';
    }

    if (
      buffer.length >= 12 &&
      buffer.toString('ascii', 0, 4) === 'RIFF' &&
      buffer.toString('ascii', 8, 12) === 'WEBP'
    ) {
      return 'image/webp';
    }

    return null;
  }

  async guardarImagen(
    archivo: Express.Multer.File,
    carpeta: CarpetaImagen,
  ): Promise<{
    nombre: string;
    ruta: string;
    mimeType: string;
    tamano: number;
  }> {
    if (!archivo?.buffer?.length) {
      throw new BadRequestException('Debes proporcionar una imagen válida');
    }

    if (archivo.buffer.length > this.tamanoMaximo) {
      throw new BadRequestException(
        'La imagen no puede superar los 5 MB',
      );
    }

    if (carpeta !== 'productos' && carpeta !== 'proveedores') {
      throw new BadRequestException('Carpeta de imágenes no válida');
    }

    const mimeTypeReal = this.detectarMimeType(archivo.buffer);

    if (
      !mimeTypeReal ||
      !this.extensionesPermitidas.has(mimeTypeReal) ||
      archivo.mimetype !== mimeTypeReal
    ) {
      throw new BadRequestException(
        'Formato no permitido. Utiliza JPG, PNG o WEBP',
      );
    }

    const extension = this.extensionesPermitidas.get(mimeTypeReal)!;
    const nombre = `${randomUUID()}${extension}`;
    const directorio = join(this.directorioBase, carpeta);
    const rutaFisica = join(directorio, nombre);

    try {
      await mkdir(directorio, { recursive: true });
      await writeFile(rutaFisica, archivo.buffer, { flag: 'wx' });
    } catch {
      throw new InternalServerErrorException(
        'No fue posible guardar la imagen',
      );
    }

    return {
      nombre,
      ruta: `/uploads/${carpeta}/${nombre}`,
      mimeType: mimeTypeReal,
      tamano: archivo.buffer.length,
    };
  }

  async eliminarImagen(ruta: string): Promise<void> {
    const patronRuta =
      /^\/uploads\/(productos|proveedores)\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(jpg|png|webp)$/i;

    const coincidencia = patronRuta.exec(ruta);

    if (!coincidencia) {
      throw new BadRequestException('Ruta de imagen no válida');
    }

    const carpeta = coincidencia[1];
    const nombre = `${coincidencia[2]}.${coincidencia[3]}`;

    const rutaFisica = join(this.directorioBase, carpeta, nombre);

    try {
      await unlink(rutaFisica);
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'ENOENT'
      ) {
        return;
      }

      throw new InternalServerErrorException(
        'No fue posible eliminar la imagen',
      );
    }
  }
}

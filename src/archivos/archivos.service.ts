import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';

export type CarpetaImagen = 'productos' | 'proveedores';

@Injectable()
export class ArchivosService {
  private readonly directorioBase = resolve(process.cwd(), 'uploads');

  private readonly extensionesPermitidas = new Map<string, string>([
    ['image/jpeg', '.jpg'],
    ['image/png', '.png'],
    ['image/webp', '.webp'],
  ]);

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

    const extension = this.extensionesPermitidas.get(archivo.mimetype);

    if (!extension) {
      throw new BadRequestException(
        'Formato no permitido. Utiliza JPG, PNG o WEBP',
      );
    }

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
      mimeType: archivo.mimetype,
      tamano: archivo.size,
    };
  }

  async eliminarImagen(ruta: string): Promise<void> {
    const rutaRelativa = ruta.replace(/^\/uploads\//, '');

    if (
      rutaRelativa === ruta ||
      !['productos', 'proveedores'].includes(
        rutaRelativa.split('/')[0],
      ) ||
      !['.jpg', '.png', '.webp'].includes(
        extname(rutaRelativa).toLowerCase(),
      )
    ) {
      throw new BadRequestException('Ruta de imagen no válida');
    }

    const rutaFisica = resolve(this.directorioBase, rutaRelativa);

    if (!rutaFisica.startsWith(this.directorioBase + sep)) {
      throw new BadRequestException('Ruta de imagen no válida');
    }

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

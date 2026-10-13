
import { Injectable } from '@nestjs/common';
import { FavoritoResponseDto } from './dto/favorito-response.dto';

@Injectable()
export class FavoritosService {
  private readonly favoritos: FavoritoResponseDto[] = [
    {
      id: 1,
      productoId: 1,
      nombre: 'Mermelada de frutilla',
      precio: 5000,
      imagen: 'https://placehold.co/600x400',
    },
    {
      id: 2,
      productoId: 3,
      nombre: 'Aceite de oliva',
      precio: 9000,
      imagen: 'https://placehold.co/600x400',
    },
  ];

  findAll(): FavoritoResponseDto[] {
    return [...this.favoritos];
  }

  add(productoId: number): FavoritoResponseDto {
    return { ...this.favoritos[0] };
  }

  remove(productoId: number): void {
    // Dummy: no modifica los datos.
  }
}

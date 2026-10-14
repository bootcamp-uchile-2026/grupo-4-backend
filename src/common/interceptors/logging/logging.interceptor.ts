import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    const { method, originalUrl } = request;
    const requestId = (
      request as Request & { requestId: string }
    ).requestId;

    const inicio = Date.now();

    const fecha = new Date(inicio)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    return next.handle().pipe(
      tap(() => {
        const duracion = Date.now() - inicio;

        this.logger.log(
          `[${requestId}] ${fecha} ${method} ${originalUrl} ${response.statusCode} ${duracion}ms`,
        );
      }),

      catchError((err: unknown) => {
        const duracion = Date.now() - inicio;

        const statusCode =
          err instanceof HttpException ? err.getStatus() : 500;

        this.logger.error(
          `[${requestId}] ${fecha} ${method} ${originalUrl} ${statusCode} ${duracion}ms`,
        );

        return throwError(() => err);
      }),
    );
  }
}

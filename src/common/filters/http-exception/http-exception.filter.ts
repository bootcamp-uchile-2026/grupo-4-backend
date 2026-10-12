
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<
      Request & { requestId?: string }
    >();

    let statusCode = 500;
    let error = 'INTERNAL_SERVER_ERROR';
    let message: string | string[] = 'Error interno del servidor';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const detail = exception.getResponse();

      if (typeof detail === 'string') {
        message = detail;
        error = exception.name;
      } else if (typeof detail === 'object' && detail !== null) {
        const details = detail as {
          error?: string;
          message?: string | string[];
        };

        error = details.error ?? exception.name;
        message = details.message ?? exception.message;
      }
    }

    if (statusCode >= 500) {
      this.logger.error(
        `[${request.requestId ?? 'sin-id'}] ${request.method} ${request.originalUrl} - ${statusCode}`,
        exception instanceof Error ? exception.stack : undefined,
      );

      error = 'INTERNAL_SERVER_ERROR';
      message = 'Error interno del servidor';
    }

    response.status(statusCode).json({
      statusCode,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
      requestId: request.requestId,
    });
  }
}

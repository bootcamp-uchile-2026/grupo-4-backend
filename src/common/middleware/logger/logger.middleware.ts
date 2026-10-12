import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');


  use(req: Request, res: Response, next: NextFunction) {
    const requestId = randomUUID();
    req['requestId'] = requestId;
    req['inicio'] = Date.now();
    res.setHeader('x-request-id', requestId);

    this.logger.log(`[${requestId}] ${req.method} ${req.originalUrl}`);
    next();
  }

}

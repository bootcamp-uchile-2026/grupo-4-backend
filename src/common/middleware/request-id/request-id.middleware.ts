import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const receivedId = req.header('x-request-id');

    const requestId =
      receivedId && /^[a-zA-Z0-9_-]{1,64}$/.test(receivedId)
        ? receivedId
        : randomUUID();

    (req as Request & { requestId: string }).requestId = requestId;

    res.setHeader('x-request-id', requestId);

    next();
  }
}

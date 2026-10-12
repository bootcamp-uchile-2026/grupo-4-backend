import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    
    const receivedId = req.header('x-request-id');

    const requestId = receivedId ?? crypto.randomUUID();

    req.requestId = requestId;
    res.setHeader('x-request-id', requestId);

    next();


  }
}

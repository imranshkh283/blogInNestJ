import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { catchError, Observable, tap } from 'rxjs';

const prisma = new PrismaService();

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const body = request.body;
    const ip =
      request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    return next.handle().pipe(
      tap(async () => {
        await prisma.logentry.create({
          data: {
            method: method,
            url: url,
            body: JSON.stringify(body),
            ip: ip,
          },
        });
        console.log(`[${method}] ${url} ${ip}`);
      }),
      catchError((error) => {
        if (error instanceof HttpException) {
          prisma.logentry.create({
            data: {
              method: method,
              url: url,
              body: JSON.stringify(body),
              ip: ip,
            },
          });
          console.error(`[${method}] ${url} - ${error.message}`);
        }
        throw error;
      }),
    );
  }
}

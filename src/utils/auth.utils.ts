import { Request } from 'express';
import { SetMetadata } from '@nestjs/common';

export function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

export const PublicAPI = () => SetMetadata('isPublicAPI', true);

import { JwtService } from '@nestjs/jwt';

export const generateToken = (userId: string) => {
  const token = userId;
  return token;
};

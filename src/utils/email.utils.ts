import { PrismaService } from '../prisma.service';

export async function isEmailExists(prisma: PrismaService, email: string) {
  const existEmail = await prisma.user.findUnique({ where: { email}})
  return !!existEmail;
}

import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export interface User {
  name: string[] | string;
}

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const user: User = { name: req.headers.username ?? 'anonymous' };

  return { req, res, user, db: client };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

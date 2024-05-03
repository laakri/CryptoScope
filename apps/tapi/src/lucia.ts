import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { Lucia } from 'lucia';

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.userSession, client.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
  }
}

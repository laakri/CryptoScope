import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './context.js';
import { lucia } from './lucia.js';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.req.headers.authorization) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'No Authorization bearer',
    });
  }

  // get user session with lucia and validate it
  const authorizationHeader = ctx.req.headers.authorization;
  const sessionId = lucia.readBearerToken(authorizationHeader ?? '');
  if (!sessionId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid session' });
  }

  const { session, user } = await lucia.validateSession(sessionId);

  console.log('user:', user);

  if (!user) {
    lucia.invalidateSession(sessionId);
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid session' });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...session, user: user },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);

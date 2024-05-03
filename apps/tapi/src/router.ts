import { z } from 'zod';
import { publicProcedure, router } from './trpc.js';
import { lucia } from './lucia.js';

const appRouter = router({
  test: publicProcedure.query(async () => {
    return { hello: 'world' };
  }),
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findFirst({
        where: { email: input.email },
      });

      if (!user || user.password !== input.password) {
        return Error('Invalid credentials');
      }

      const session = await lucia.createSession(user.id, {});
      return { success: true, username: input.email, sessionId: session.id };
    }),
});

export default appRouter;

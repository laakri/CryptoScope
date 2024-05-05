import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc.js';
import { lucia } from '../lucia.js';
import argon from 'argon2';
import { TRPCError } from '@trpc/server';

export const userRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existingUser = await ctx.db.user.findFirst({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new TRPCError({
          message: 'User already exists',
          code: 'BAD_REQUEST',
        });
      }

      const hashedPassword = await argon.hash(input.password);
      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });

      delete user.password;

      return { user };
    }),
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6) }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findFirst({
        where: { email: input.email },
      });

      if (!user) {
        return new TRPCError({
          message: 'Invalid Credentials',
          code: 'BAD_REQUEST',
        });
      }

      const isValid = await argon.verify(user.password, input.password);
      if (!isValid) {
        return new TRPCError({
          message: 'Invalid Credentials',
          code: 'BAD_REQUEST',
        });
      }

      const session = await lucia.createSession(user.id, {});
      return { data: { username: input.email, sessionId: session.id } };
    }),
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
    });

    if (!user) {
      await lucia.invalidateSession(ctx.session.id);
      return new TRPCError({
        message: 'User not found',
        code: 'NOT_FOUND',
      });
    }

    delete user.password;
    return { data: { user } };
  }),
});

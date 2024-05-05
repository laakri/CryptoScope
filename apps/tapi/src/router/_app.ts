import { router } from '../trpc.js';
import { userRouter } from './user.js';

export const appRouter = router({
  users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

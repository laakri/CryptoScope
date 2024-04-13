import { publicProcedure, router } from './trpc';

const appRouter = router({
  test: publicProcedure.query(async () => {
    return { hello: 'world' };
  }),
});

export default appRouter;

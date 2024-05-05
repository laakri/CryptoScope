import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { getFastifyPlugin } from 'trpc-playground/handlers/fastify';
import fastify from 'fastify';
import { createContext } from './context.js';
import { appRouter } from './router/_app.js';

export interface ServerOptions {
  dev?: boolean;
  port?: number;
  prefix?: string;
}

export function createServer(opts: ServerOptions) {
  const port = opts.port ?? 3000;
  const prefix = opts.prefix ?? '/trpc';
  const server = fastify({ logger: true });

  void server.register(fastifyTRPCPlugin, {
    prefix,
    trpcOptions: { router: appRouter, createContext },
  });

  const stop = async () => {
    await server.close();
  };
  const start = async () => {
    try {
      void server.register(
        await getFastifyPlugin({
          trpcApiEndpoint: prefix,
          playgroundEndpoint: '/playground',
          router: appRouter,
          request: { superjson: true },
        }),
        { prefix: '/playground' }
      );
      await server.listen({ port });
      console.log('listening on port', port);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  return { server, start, stop };
}

export const serverConfig: ServerOptions = {
  dev: true,
  port: 8001,
  prefix: '/trpc',
};

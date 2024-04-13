import { createServer } from './server';

const server = createServer({ dev: true, port: 8001, prefix: '/trpc' });

server.start();

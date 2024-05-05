import { createServer } from './server.js';

const server = createServer({ dev: true, port: 8001, prefix: '/trpc' });

server.start();

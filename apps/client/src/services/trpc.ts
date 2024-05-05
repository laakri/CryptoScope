import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../tapi/src/router/_app";
import superjson from "superjson";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8001/trpc",
    }),
  ],
  transformer: superjson,
});

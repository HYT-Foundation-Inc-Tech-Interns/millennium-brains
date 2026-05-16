// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config/dist/index.js";
import { nitro } from "nitro/vite";

// Cloudflare builds (default in @lovable.dev/vite-tanstack-config) emit a Workers bundle;
// Vercel needs Nitro instead — see https://vercel.com/docs/frameworks/full-stack/tanstack-start
const deployTarget = process.env.VERCEL === "1" ? "vercel" : "cloudflare";

// Redirect TanStack Start's bundled server entry to src/server.ts (SSR error wrapper for CF).
export default defineConfig({
  cloudflare: deployTarget === "vercel" ? false : undefined,
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    define: {
      __VERCEL__: deployTarget === "vercel",
    },
    plugins: deployTarget === "vercel" ? [nitro()] : [],
  },
});

// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, componentTagger (dev-only),
//     VITE_* env injection, @ path alias, React/TanStack dedupe, error logger plugins,
//     and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config/dist/index.js";

// The deploy bundle is produced by Nitro. It only auto-enables inside Lovable's
// environment, so for self-deploy (Cloudflare/Vercel) we force it on:
//   - Cloudflare: `nitro: true` uses the default `cloudflare-module` preset.
//   - Vercel: override the preset.
const deployTarget = process.env.VERCEL === "1" ? "vercel" : "cloudflare";

// Redirect TanStack Start's bundled server entry to src/server.ts (SSR error wrapper).
export default defineConfig({
  nitro: deployTarget === "vercel" ? { preset: "vercel" } : true,
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    define: {
      __VERCEL__: deployTarget === "vercel",
    },
    build: {
      rollupOptions: {
        // `cloudflare:workers` is a workerd runtime built-in (used in
        // src/routes/api/inquiry.ts to read the D1 binding). It isn't a real
        // package, so keep it external and let the Worker resolve it at runtime.
        external: ["cloudflare:workers"],
      },
    },
  },
});

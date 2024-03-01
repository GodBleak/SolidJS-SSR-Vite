import "dotenv/config";
import express from "express";
import { createServer as createHTTPServer } from "http";
import { createServer as createViteServer, type ViteDevServer } from "vite";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const httpServer = createHTTPServer(app);
let viteServer: ViteDevServer | undefined;

if (isDev()) {
  viteServer = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: "custom",
    publicDir: path.join(__dirname, "public"),
    configFile: "vite.config.ts",
  });
  app.use(viteServer.middlewares);
} else app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", async (_, res) => {
  try {
    const { render } =
      isDev() && viteServer
        ? await viteServer.ssrLoadModule("src/web/render.tsx")
        : await import("./web/render");

    res.status(200);
    res.write(`<!DOCTYPE html>`);
    res.write(await render());
    res.end();
  } catch (error) {
    if (error instanceof Error) {
      if (isDev() && viteServer) viteServer.ssrFixStacktrace(error);
      console.error(error);
      return res.status(500).send(error.stack);
    }
    throw error;
  }
});

httpServer.listen(port, () =>
  console.log(`Serving Solid SSR on Port ${port}!`)
);

function isDev() {
  return process.env.NODE_ENV === "development";
}

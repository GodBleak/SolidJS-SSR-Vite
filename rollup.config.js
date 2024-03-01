import nodeResolve from "@rollup/plugin-node-resolve";
import common from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import copy from "rollup-plugin-copy";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import json from "@rollup/plugin-json";

import tailwindConfig from "./tailwind.config.js";

export default [
  {
    input: "src/index.ts",
    preserveEntrySignatures: false,
    output: [
      {
        dir: "dist",
        format: "es",
      },
    ],
    external: ["solid-js", "solid-js/web", "path", "express", "stream", "vite"],
    plugins: [
      replace({
        values: {
          "src/web/hydrate.tsx": "public/js/hydrate.js",
        },
      }),
      nodeResolve({
        preferBuiltins: true,
        exportConditions: ["solid", "node"],
      }),
      common(),
      postcss(),
      typescript(),
      json(),
      babel({
        babelHelpers: "bundled",
        presets: [["solid", { generate: "ssr", hydratable: true }]],
        extensions: [".ts", ".js", ".jsx", ".tsx"],
      }),
    ],
  },
  {
    input: "src/web/hydrate.tsx",
    output: [
      {
        dir: "dist/public/js",
        format: "esm",
      },
    ],
    preserveEntrySignatures: false,
    plugins: [
      nodeResolve({ exportConditions: ["solid"], browser: true }),
      typescript(),
      json(),
      babel({
        babelHelpers: "bundled",
        presets: [["solid", { generate: "dom", hydratable: true }]],
        extensions: [".ts", ".js", ".jsx", ".tsx"],
      }),
      common(),
      postcss({
        extensions: [".css", ".module.css"],
        plugins: [autoprefixer(), tailwindcss(tailwindConfig)],
      }),
      copy({
        targets: [
          {
            src: ["public/*"],
            dest: "dist/public",
          },
        ],
      }),
    ],
  },
];

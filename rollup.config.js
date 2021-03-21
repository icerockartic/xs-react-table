import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import cleanup from "rollup-plugin-cleanup";

const packageJson = require("./package.json");

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packageJson.module,
      format: "esm",
    },
  ],
  plugins: [
    babel({ babelHelpers: "bundled" }),
    json(),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    cleanup({
      comments: "none",
      extensions: ["ts", "tsx", "js", "esm", "jsx"],
      sourcemap: false,
    }),
  ],
};

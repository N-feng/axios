import resolve from "rollup-plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { babel } from "@rollup/plugin-babel"
import vue from "rollup-plugin-vue"
import { terser } from "rollup-plugin-terser"

const babelOptions = {
  "presets": ['@babel/preset-env'],
}

const isDev = process.env.NODE_ENV !== 'production'

const config = {
  input: "./src/index.js",
  output: {
    file: './dist/index.umd.js',
    format: 'umd',
    name: 'App'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(babelOptions),
    vue({
      css: true,
      compileTemplate: true
    }),
    !isDev && terser()
  ]
}

export default config
import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import alias from '@rollup/plugin-alias'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import htmlInsert from 'rollup-plugin-html-insert'
import dev from 'rollup-plugin-dev' // 开发服务器
import css from 'rollup-plugin-css-only'

const extensions = ['.js', '.ts', '.vue']
const production = !process.env.ROLLUP_WATCH // process.env.NODE_ENV === 'production' // production development

const plugins = [
  dev({ dirs: ['dist'] }),
  alias({
    entries: {
      vue: 'vue/dist/vue.runtime.esm-browser.prod.js'
    }
  }),
  resolve({ extensions, browser: true }),
  commonjs(),
  vue(),
  css({ output: 'bundle.css' }),
  postcss({
    minimize: true
  }),
  typescript({
    include: [/\.tsx?$/, /\.vue\?.*?lang=ts/],
    useTsconfigDeclarationDir: true
  }),
  htmlInsert({
    // insert: 'path'
  })
]

if (!production) {
  plugins.push(livereload('dist'))
  // plugins.push(
  //   serve({
  //     historyApiFallback: true,
  //     contentBase: ['dist']
  //   })
  // )
}

export default {
  input: './src/main.ts',
  external: [],
  plugins,
  output: [
    {
      dir: 'dist',
      format: 'iife', // "amd", "cjs", "system", "es", "iife" or "umd".
      entryFileNames: '[name].iife.[hash].js'
    }
  ]
}

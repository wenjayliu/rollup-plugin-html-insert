// rollup.config.js
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import dev from 'rollup-plugin-dev' // 开发服务器
import terser from '@rollup/plugin-terser' // 代码压缩
import cleanupDir from 'rollup-plugin-cleanup-dir' // 清空目录
import livereload from 'rollup-plugin-livereload'
import htmlInsert from 'rollup-plugin-html-insert'
import typescript from '@rollup/plugin-typescript'

const production = !process.env.ROLLUP_WATCH

export default [
  {
    input: {
      main: 'src/main.ts'
    },
    output: [
      {
        dir: 'dist',
        format: 'iife', // "amd", "cjs", "system", "es", "iife" or "umd".
        entryFileNames: '[name].iife.[hash].js'
      }
    ],
    plugins: [
      typescript({ sourceMap: true }),
      dev({ dirs: ['dist'] }),
      !production && livereload('dist'),
      production && cleanupDir(),
      production && terser(),
      resolve(),
      commonjs(),
      htmlInsert({
        // insert: 'path'
      })
    ]
  }
]

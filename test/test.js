import test from 'ava'
import { rollup } from 'rollup'
import htmlInsert from '../dist/es/index.js'

/**
 * @param {import('rollup').RollupBuild} bundle
 * @param {import('rollup').OutputOptions} [outputOptions]
 */
const getCode = async (bundle, outputOptions, allFiles = false) => {
  const { output } = await bundle.generate(outputOptions || { format: 'iife', exports: 'auto' })

  if (allFiles) {
    return output.map(({ code, fileName, source, map }) => {
      return { code, fileName, source, map }
    })
  }
  const [{ code }] = output
  return code
}
const output = { dir: 'output', format: 'iife', entryFileNames: '[name].iife.[hash].js', }

test.serial('template', async (t) => {
  const bundle = await rollup({
    input: 'test/fixtures/batman.js',
    plugins: [htmlInsert({ template: 'test/public/index.html' })]
  })
  const code = await getCode(bundle, output, true)
  console.log('code--', code)
  t.snapshot(code)
})

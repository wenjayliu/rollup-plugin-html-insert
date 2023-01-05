import { readFileSync } from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import typescript from '@rollup/plugin-typescript'

const  pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

export default {
  input: 'src/index.ts',
  strictDeprecations: true,
  output: [
    {
      format: 'cjs',
      file: pkg.cjs,
      exports: 'named',
      footer: 'module.exports = Object.assign(exports.default, exports);',
      sourcemap: true
    },
    {
      format: 'es',
      file: pkg.module,
      plugins: [emitModulePackageFile()],
      sourcemap: true
    }
  ],
  plugins: [typescript({ sourceMap: true })]
}

export function emitModulePackageFile() {
  return {
    name: 'emit-module-package-file',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'package.json',
        source: `{"type":"module"}`
      });
    }
  };
}

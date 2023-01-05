# rollup-plugin-html-insert

🍣 A Rollup plugin which creates HTML files to serve Rollup bundles. The default function is to package all html css js in one html file.

## Localized plugin docs
- [简体中文](https://github.com/wenjayliu/rollup-plugin-html-insert/blob/main/readme.zh_CN.md) _(by [@wenjayliu](https://github.com/wenjayliu))_

## Install
Using pnpm:

```console
pnpm add -D rollup-plugin-html-insert
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:  

```js
import htmlInsert from 'rollup-plugin-html-insert'

export default {
  input: 'src/main.js',
  output: {
    dir: 'output',
    format: 'iife'
  },
  plugins: [htmlInsert()]
}
```


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

Default package output

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>test</title>
  </head>

  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script id="main">
      ;(function () {
        // JavaScript bundle code ...
      })()
    </script>
  </body>
</html>
```

## options
### template
Specifies a String that provides the rendered source for the HTML file. The function should be in the form of:  

Type: `String`  
example: `htmlInsert({ template: 'index.html'})`  
default: `'./public/index.html'`  

### insert
Insert path or code:  

Type: `String`   
example: `htmlInsert({ insert: 'path'}) `  
default: `'code'`  


### entryFileNames
the output file name.  

Type: `String`   
example: `htmlInsert({ entryFileNames: 'index.html'}) `  
default: `'index.html'`  

### publicPath
Specifies a path to prepend to all bundle assets (files) in the HTML output.  

Type: `String`   
example: `htmlInsert({ publicPath: './'}) `  
default: `'./'`  



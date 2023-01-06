# rollup-plugin-html-insert

🍣 一个操作html的rollup的插件, 默认功能是将html css js 全部打包在一个html文件内。  

## 安装插件
使用 pnpm:

```console
pnpm add -D rollup-plugin-html-insert
```

## 使用插件

创建 `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) 引入并使用插件:

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

默认打包输出示例：

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

## options参数
### template
html 模板文件的路径:  

Type: `String`  
example: `htmlInsert({ template: 'index.html'})`  
default: `'./public/index.html'`  

### insert
打包后注入html的方式，默认`code`打包后的源代码插入html, `path`打包后加载路径:  

Type: `String`   
example: `htmlInsert({ insert: 'path'}) `  
default: `'code'`  


### entryFileNames
打包后输出的文件名称.  

Type: `String`   
example: `htmlInsert({ entryFileNames: 'index.html'}) `  
default: `'index.html'`  

### publicPath
insert path 时引入路径的前缀.  

Type: `String`   
example: `htmlInsert({ publicPath: './'}) `  
default: `'./'`  



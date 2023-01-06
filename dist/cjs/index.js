'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var path = require('path');
var nodeHtmlParser = require('node-html-parser');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var fs__namespace = /*#__PURE__*/_interopNamespaceDefault(fs);

const getFiles = (bundle) => {
    const result = {};
    for (const file of Object.values(bundle)) {
        const { fileName } = file;
        const extension = path.extname(fileName).substring(1);
        result[extension] = (result[extension] || []).concat(file);
    }
    return result;
};
const getChildElement = (node, tag, append = true) => {
    let child = node.querySelector(tag);
    if (!child) {
        child = new nodeHtmlParser.HTMLElement(tag, {}, '', node, [0, 0]);
        if (append) {
            node.appendChild(child);
        }
        else {
            node.childNodes.unshift(child);
        }
    }
    return child;
};
const defaults = {
    entryFileNames: 'index.html',
    insert: 'code',
    publicPath: './',
    template: './public/index.html'
};
/**
 * html 模板操作
 * @param opts.entryFileNames    输出文件名
 * @param opts.insert            注入路劲或者代码 code | path
 * @param opts.publicPath        路径注入是前缀地址
 * @param opts.template          html模板文件地址
 * @returns 修改后html
 */
function htmlInsert(opts = {}) {
    const { template, insert, entryFileNames, publicPath } = Object.assign(defaults, opts);
    return {
        name: 'htmlInsert',
        async generateBundle(output, bundle) {
            // let distDir = process.cwd()
            // const htmlFileName = path.resolve(distDir, path.basename(template))
            const htmlTpl = fs__namespace.readFileSync(template).toString();
            const doc = nodeHtmlParser.parse(htmlTpl, { comment: true });
            const html = doc.querySelector('html');
            if (!html) {
                this.error("The input template doesn't contain the `html`");
            }
            const head = getChildElement(html, 'head', false);
            const body = getChildElement(html, 'body');
            /** { js: [], css: [] } */
            const files = getFiles(bundle);
            // console.log('files', files)
            // 通过路劲加载资源
            if (insert === 'path') {
                const scripts = (files.js || []);
                for (let index = 0; index < scripts.length; index++) {
                    const { fileName, name } = scripts[index];
                    const entry = new nodeHtmlParser.HTMLElement('script', { id: name }, '', body, [0, 0]);
                    entry.setAttribute('src', `${publicPath}${fileName}`);
                    body.appendChild(entry);
                }
                const links = (files.css || []);
                for (let index = 0; index < links.length; index++) {
                    const { fileName, name } = links[index];
                    const entry = new nodeHtmlParser.HTMLElement('link', { id: name }, '', head, [0, 0]);
                    entry.setAttribute('href', `${publicPath}${fileName}`);
                    entry.setAttribute('rel', 'stylesheet');
                    head.appendChild(entry);
                }
            }
            // 直接将打包好的代码插入html
            if (insert === 'code') {
                const scripts = (files.js || []);
                for (let index = 0; index < scripts.length; index++) {
                    const { name, code } = scripts[index];
                    const entry = new nodeHtmlParser.HTMLElement('script', { id: name }, '', body, [0, 0]);
                    entry.appendChild(new nodeHtmlParser.TextNode(code, entry));
                    body.appendChild(entry);
                }
                const links = (files.css || []);
                for (let index = 0; index < links.length; index++) {
                    const { source, name } = links[index];
                    const entry = new nodeHtmlParser.HTMLElement('style', { id: name }, '', head, [0, 0]);
                    entry.appendChild(new nodeHtmlParser.TextNode(source, entry));
                    head.appendChild(entry);
                }
            }
            const source = doc.toString();
            const htmlFile = {
                type: 'asset',
                source,
                name: 'public_html',
                fileName: entryFileNames
            };
            this.emitFile(htmlFile);
        }
    };
}

exports.default = htmlInsert;
module.exports = Object.assign(exports.default, exports);
//# sourceMappingURL=index.js.map

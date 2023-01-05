import * as fs from 'fs';
import { extname } from 'path';
import { parse, HTMLElement, TextNode } from 'node-html-parser';

const getFiles = (bundle) => {
    const result = {};
    for (const file of Object.values(bundle)) {
        const { fileName } = file;
        const extension = extname(fileName).substring(1);
        result[extension] = (result[extension] || []).concat(file);
    }
    return result;
};
const getChildElement = (node, tag, append = true) => {
    let child = node.querySelector(tag);
    if (!child) {
        child = new HTMLElement(tag, {}, '', node, [0, 0]);
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
function htmlInsert(opts = {}) {
    const { template, insert, entryFileNames, publicPath } = Object.assign(defaults, opts);
    return {
        name: 'htmlInsert',
        async generateBundle(output, bundle) {
            // let distDir = process.cwd()
            // const htmlFileName = path.resolve(distDir, path.basename(template))
            const htmlTpl = fs.readFileSync(template).toString();
            const doc = parse(htmlTpl, { comment: true });
            const html = doc.querySelector('html');
            const head = getChildElement(html, 'head', false);
            const body = getChildElement(html, 'body');
            /** { js: [], css: [] } */
            const files = getFiles(bundle);
            console.log('files', files);
            // 通过路劲加载资源
            if (insert === 'path') {
                const scripts = (files.js || []);
                for (let index = 0; index < scripts.length; index++) {
                    const { fileName, name } = scripts[index];
                    const entry = new HTMLElement('script', { id: name }, '', body, [0, 0]);
                    entry.setAttribute('src', `${publicPath}${fileName}`);
                    body.appendChild(entry);
                }
                const links = (files.css || []);
                for (let index = 0; index < links.length; index++) {
                    const { fileName, name } = links[index];
                    const entry = new HTMLElement('link', { id: name }, '', head, [0, 0]);
                    entry.setAttribute('href', `${publicPath}${fileName}`);
                    entry.setAttribute('rel', 'stylesheet');
                    body.appendChild(entry);
                }
            }
            // 直接将打包好的代码插入html
            if (insert === 'code') {
                const scripts = (files.js || []);
                for (let index = 0; index < scripts.length; index++) {
                    const { name, code } = scripts[index];
                    const entry = new HTMLElement('script', { id: name }, '', body, [0, 0]);
                    entry.appendChild(new TextNode(code, entry));
                    body.appendChild(entry);
                }
                const links = (files.css || []);
                for (let index = 0; index < links.length; index++) {
                    const { source, name } = links[index];
                    const entry = new HTMLElement('style', { id: name }, '', head, [0, 0]);
                    entry.appendChild(new TextNode(source, entry));
                    body.appendChild(entry);
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

export { htmlInsert as default };
//# sourceMappingURL=index.js.map

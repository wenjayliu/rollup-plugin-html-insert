// Note: This file is necessary so that prettier writes which happen in hooks and scripts match the
// same config that we're using from the eslint-config package.
// module.exports = require('eslint-config-rollup/prettier');

module.exports = {
  semi: false,
  printWidth: 200,
  singleQuote: true,
  trailingComma: 'none',
  htmlWhitespaceSensitivity: 'ignore'
}

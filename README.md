# npm tarball license parser
license parser

## Requirements
- [Node.js](https://nodejs.org/en/) v12 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i ntlp
# or
$ yarn add ntlp
```

## Usage example

```js
const parseLicense = require("ntlp");

async function main() {
    const license = parseLicense(__dirname);
    console.log(license);
}
main().catch(console.error);
```

## License
MIT

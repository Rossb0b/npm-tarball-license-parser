# npm tarball license parser
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/NodeSecure/npm-tarball-license-parser/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/NodeSecure/npm-tarball-license-parser/commit-activity)
[![Security Responsible Disclosure](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md
)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/NodeSecure/npm-tarball-license-parser/blob/master/LICENSE)
![dep](https://img.shields.io/david/NodeSecure/npm-tarball-license-parser)

license parser

## Requirements
- [Node.js](https://nodejs.org/en/) v14 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/ntlp
# or
$ yarn add @nodesecure/ntlp
```

## Usage example

```js
import parseLicense from "@nodesecure/ntlp";

async function main() {
    const license = await parseLicense(__dirname);
    console.log(license);
}
main().catch(console.error);
```

Return the following interface
```ts
interface license {
    uniqueLicenseIds: string[];
    spdxLicenseLinks: string[];
    spdx: {
        osi: boolean;
        fsf: boolean;
        fsfAndOsi: boolean;
        includesDeprecated: boolean;
    },
    from: string;
}

interface result {
    licenses: license[];
    uniqueLicenseIds: Set<string>;
}
```

## API

### parseLicense(dest: string): Promise< ntlp.result >
parse a given tarball directory and return a result interface.


## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->


<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT

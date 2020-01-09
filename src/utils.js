"use strict";

// CONSTANTS
const kLicenses = new Map([
    ["BSD 3-Clause", "BSD 3-Clause"],
    ["BSD ", "BSD"],
    ["ISC ", "ISC"],
    ["Apache License", "Apache"],
    ["Mozilla", "Mozilla"],
    ["LGPL ", "LGPL"],
    ["Affero ", "GPL"],
    ["GPL ", "GPL"],
    ["Eclipse", "Eclipse"],
    ["Artistic", "Artistic"],
    ["DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE", "WTF"],
    ["MIT ", "MIT"]
]);

// code from https://github.com/cutenode/liblice/blob/master/lib/parseLicense.js
function parsePackageLicense(file) {
    if (file.license !== undefined) {
        if (typeof file.license === "string") {
            return handleUndefinedAndNull(file.license);
        }

        if (typeof file.license === "object") {
            return handleUndefinedAndNull(file.license.type);
        }
    }

    if (file.licenses !== undefined) {
        if (Array.isArray(file.licenses)) {
            return handleUndefinedAndNull(file.licenses[0].type);
        }

        if (typeof file.licenses === "object") {
            return handleUndefinedAndNull(file.licenses.type);
        }
    }

    return handleUndefinedAndNull(undefined);
}

function getLicenseFromString(str) {
    for (const [name, licenseName] of kLicenses.entries()) {
        if (str.indexOf(name) > -1) {
            return licenseName;
        }
    }

    return "unknown license";
}

function handleUndefinedAndNull(licenseString) {
    if (licenseString === undefined) {
        return "invalid license";
    }

    return licenseString;
}

module.exports = {
    parsePackageLicense,
    getLicenseFromString
};

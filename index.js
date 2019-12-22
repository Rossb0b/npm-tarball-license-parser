"use strict";

// Require Node.js Dependencies
const { join } = require("path");
const { readdir, readFile } = require("fs").promises;

// Require Third-party Dependencies
const conformance = require("conformance");

// Require Internal
const { parsePackageLicense, getLicenseFromString } = require("./src/utils");

/**
 * @async
 * @function parseLicense
 * @description parse License file for a given project!
 * @param {!string} dest
 * @param {boolean} [forceOnFiles=false]
 * @returns {Promise<any>}
 */
async function parseLicense(dest, forceOnFiles = false) {
    if (typeof dest !== "string") {
        throw new TypeError("dest must be a string!");
    }
    let license = "invalid license";
    let from = "package.json";

    try {
        const packageStr = await readFile(join(dest, "package.json"), "utf-8");
        license = parsePackageLicense(JSON.parse(packageStr));
    }
    catch (err) {
        // Ignore
    }

    const files = (await readdir(dest, { withFileTypes: true }))
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name);

    const licenseFiles = files.filter((value) => value.toLowerCase().includes("license"));
    if ((license === "invalid license" && licenseFiles.length > 0) || forceOnFiles) {
        const licenseFile = licenseFiles[0];
        const str = await readFile(join(dest, licenseFile), "utf-8");
        const licenseName = getLicenseFromString(str);
        if (licenseName !== "unknown license") {
            license = licenseName;
            from = licenseFile;
        }
    }

    return {
        license: conformance(license),
        licenseFiles,
        from
    };
}

module.exports = parseLicense;

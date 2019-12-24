"use strict";

// Require Node.js Dependencies
const { join } = require("path");
const { readdir, readFile } = require("fs").promises;

// Require Third-party Dependencies
const conformance = require("conformance");

// Require Internal
const { parsePackageLicense, getLicenseFromString } = require("./src/utils");

async function parseLicense(dest) {
    if (typeof dest !== "string") {
        throw new TypeError("dest must be a string!");
    }
    const licenses = [];
    const uniqueLicenseIds = [];
    let hasMultipleLicenses = false;

    try {
        const packageStr = await readFile(join(dest, "package.json"), "utf-8");
        const detectedName = parsePackageLicense(JSON.parse(packageStr));
        const license = conformance(detectedName);
        uniqueLicenseIds.push(...license.uniqueLicenseIds);
        license.from = "package.json";

        licenses.push(license);
    }
    catch (err) {
        // Ignore
    }

    const licenseFiles = (await readdir(dest, { withFileTypes: true }))
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name)
        .filter((value) => value.toLowerCase().includes("license"));

    for (const file of licenseFiles) {
        const str = await readFile(join(dest, file), "utf-8");
        const licenseName = getLicenseFromString(str);
        if (licenseName !== "unknown license") {
            const license = conformance(licenseName);
            for (const localLicenseName of license.uniqueLicenseIds) {
                if (!uniqueLicenseIds.includes(localLicenseName)) {
                    hasMultipleLicenses = true;
                }
                uniqueLicenseIds.push(localLicenseName);
            }
            license.from = file;
            licenses.push(license);
        }
    }

    return {
        uniqueLicenseIds: [...new Set(uniqueLicenseIds)],
        hasMultipleLicenses,
        licenses
    };
}

module.exports = parseLicense;

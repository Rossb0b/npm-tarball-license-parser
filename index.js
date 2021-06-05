// Require Node.js Dependencies
import { join } from "path";
import { promises } from "fs";

// Require Third-party Dependencies
import conformance from "conformance";

// Require Internal
import { parsePackageLicense, getLicenseFromString } from "./src/utils.js";

const { readdir, readFile } = promises;

async function parseLicense(dest) {
  if (typeof dest !== "string") {
    throw new TypeError("dest must be a string!");
  }
  const licenses = [];
  const uniqueLicenseIds = [];
  let hasMultipleLicenses = false;

  const packageStr = await readFile(join(dest, "package.json"), "utf-8");
  const detectedName = parsePackageLicense(JSON.parse(packageStr));
  const license = conformance(detectedName);
  uniqueLicenseIds.push(...license.uniqueLicenseIds);
  license.from = "package.json";
  licenses.push(license);

  const licenseFiles = (await readdir(dest, { withFileTypes: true }))
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name)
    .filter((value) => value.toLowerCase().includes("license"));

  for (const file of licenseFiles) {
    const str = await readFile(join(dest, file), "utf-8");
    const licenseName = getLicenseFromString(str);
    if (licenseName !== "unknown license") {
      const license = conformance(licenseName);
      if (Reflect.has(license, "error")) {
        continue;
      }
      license.from = file;
      licenses.push(license);

      for (const localLicenseName of license.uniqueLicenseIds) {
        if (!uniqueLicenseIds.includes(localLicenseName)) {
          hasMultipleLicenses = true;
        }
        uniqueLicenseIds.push(localLicenseName);
      }
    }
  }

  return {
    uniqueLicenseIds: [...new Set(uniqueLicenseIds)],
    hasMultipleLicenses,
    licenses
  };
}

export default parseLicense;

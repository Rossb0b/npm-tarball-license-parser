import test from "tape";

// Require Node.js Dependencies
import { join } from "path";
import { readFileSync } from "fs";

// Require Internal Dependencies
import { getDirNameFromUrl, getLicenseFromString } from "../src/utils.js";

// CONSTANTS
const __dirname = getDirNameFromUrl(import.meta.url);
const FIXTURE_PATH = join(__dirname, "fixtures/getLicenseFromString");

// Payloads
const MIT = readFileSync(join(FIXTURE_PATH, "MIT.md"), "utf-8");

test("should return 'MIT' for getLicenseFromString of MIT file", (tape) => {
  const result = getLicenseFromString(MIT);

  tape.strictEqual(result, "MIT");
  tape.end();
});

test("should return 'Unknown License' for getLicenseFromString from random string", (tape) => {
  const result = getLicenseFromString("hello world!");

  tape.strictEqual(result, "unknown license");
  tape.end();
});

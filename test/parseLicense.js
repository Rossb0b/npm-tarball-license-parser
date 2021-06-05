import test from "tape";

// Require Node.js Dependencies
import { join } from "path";

// Require Internal Dependencies
import parseLicense from "../index.js";
import { getDirNameFromUrl } from "../src/utils.js";

// Require fixture
import expectedParsedLicense from "./fixtures/parseLicense.snap.js";

// CONSTANTS
const __dirname = getDirNameFromUrl(import.meta.url);
const FIXTURE_PATH = join(__dirname, "fixtures");

test("parseLicense of project1", async(tape) => {
  const result = await parseLicense(join(FIXTURE_PATH, "project1"));

  tape.same(result.uniqueLicenseIds, ["ISC", "MIT"]);
  tape.same(result, expectedParsedLicense);
  tape.end();
});

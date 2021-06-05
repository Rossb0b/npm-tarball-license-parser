import test from "tape";

// Require Internal Dependencies
import { parsePackageLicense } from "../src/utils.js";

test("should return 'MIT' for parsePackageLicense license MIT", (tape) => {
  const result = parsePackageLicense({
    license: "MIT"
  });
  tape.strictEqual(result, "MIT");
  tape.end();
});

test("should return 'MIT AND (CC0-1.0 OR ISC)' for parsePackageLicense of Object", (tape) => {
  const result = parsePackageLicense({
    license: {
      type: "MIT AND (CC0-1.0 OR ISC)"
    }
  });
  tape.strictEqual(result, "MIT AND (CC0-1.0 OR ISC)");
  tape.end();
});

test("parsePackageLicense of payload with licenses property", (tape) => {
  const result = parsePackageLicense({
    licenses: {
      type: "MIT AND (CC0-1.0 OR ISC)"
    }
  });
  tape.strictEqual(result, "MIT AND (CC0-1.0 OR ISC)");
  tape.end();
});

test("parsePackageLicense of payload with licenses property as Array", (tape) => {
  const result = parsePackageLicense({
    licenses: [
      {
        type: "ISC"
      }
    ]
  });
  tape.strictEqual(result, "ISC");
  tape.end();
});

test("parsePackageLicense with empty payload", (tape) => {
  const result = parsePackageLicense({});
  tape.strictEqual(result, "invalid license");
  tape.end();
});

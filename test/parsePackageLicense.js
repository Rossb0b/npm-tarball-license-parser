"use strict";

// Require Internal Dependencies
const { parsePackageLicense } = require("../src/utils");

test("should return 'MIT' for parsePackageLicense license MIT", () => {
    const result = parsePackageLicense({
        license: "MIT"
    });
    expect(result).toStrictEqual("MIT");
});

test("should return 'MIT AND (CC0-1.0 OR ISC)' for parsePackageLicense of Object", () => {
    const result = parsePackageLicense({
        license: {
            type: "MIT AND (CC0-1.0 OR ISC)"
        }
    });
    expect(result).toStrictEqual("MIT AND (CC0-1.0 OR ISC)");
});

test("parsePackageLicense of payload with licenses property", () => {
    const result = parsePackageLicense({
        licenses: {
            type: "MIT AND (CC0-1.0 OR ISC)"
        }
    });
    expect(result).toStrictEqual("MIT AND (CC0-1.0 OR ISC)");
});

test("parsePackageLicense of payload with licenses property as Array", () => {
    const result = parsePackageLicense({
        licenses: [
            {
                type: "ISC"
            }
        ]
    });
    expect(result).toStrictEqual("ISC");
});

test("parsePackageLicense with empty payload", () => {
    const result = parsePackageLicense({});
    expect(result).toStrictEqual("invalid license");
});

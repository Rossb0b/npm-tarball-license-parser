"use strict";

// Require Node.js Dependencies
const { join } = require("path");

// Require Internal Dependencies
const parseLicense = require("..");

// CONSTANTS
const FIXTURE_PATH = join(__dirname, "fixtures");

test("parseLicense of project1", async() => {
    const result = await parseLicense(join(FIXTURE_PATH, "project1"));
    expect(result.uniqueLicenseIds).toEqual(new Set(["ISC", "MIT"]));
    expect(result).toMatchSnapshot();
});

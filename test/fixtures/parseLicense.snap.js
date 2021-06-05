export default {
  hasMultipleLicenses: true,
  licenses: [
    {
      from: "package.json",
      spdx: {
        fsf: true,
        fsfAndOsi: true,
        includesDeprecated: false,
        osi: true
      },
      spdxLicenseLinks: [
        "https://spdx.org/licenses/ISC.html#licenseText"
      ],
      uniqueLicenseIds: [
        "ISC"
      ]
    },
    {
      from: "LICENSE",
      spdx: {
        fsf: true,
        fsfAndOsi: true,
        includesDeprecated: false,
        osi: true
      },
      spdxLicenseLinks: [
        "https://spdx.org/licenses/MIT.html#licenseText"
      ],
      uniqueLicenseIds: [
        "MIT"
      ]
    }
  ],
  uniqueLicenseIds: [
    "ISC",
    "MIT"
  ]
};


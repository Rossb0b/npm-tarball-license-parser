/// <reference types="conformance" />

declare namespace LiParser {
    interface license {
        license: {
            uniqueLicenseIds: string[],
            spdxLicenseLinks: string[],
            spdx: {
                osi: boolean;
                fsf: boolean;
                fsfAndOsi: boolean;
                includesDeprecated: boolean;
            }
        },
        from: string;
        licenseFiles: string[];
    }

    declare function parseLicense(dest: string, forceOnFiles?: boolean): Promise<license>;
}


export = LiParser;
export as namespace LiParser;

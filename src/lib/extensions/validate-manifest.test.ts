import { expect, test } from "vitest";
import { validateManifest } from "./validate-manifest";

const testData = [
  ["", false],
  ["some string", false],
  [0, false],
  [1234, false],
  [[], false],
  [{}, false],
  [null, false],
  [true, false],
  [false, false],
  [undefined, false],
  [() => {}, false],
  // real tests
  [
    {
      "id": 0,
    },
    false,
  ],
  [
    {
      "id"        : 0,
      "logo"      : "",
      "name"      : "",
      "url"       : "",
      "version"   : "",
      "authors"   : [],
      "languages" : [],
      "categories": [],
    },
    false,
  ],
  [
    {
      "id"        : "",
      "logo"      : "",
      "name"      : "",
      "url"       : "",
      "version"   : "",
      "authors"   : [],
      "languages" : [],
      "categories": [],
    },
    {
      "id"        : "",
      "logo"      : "",
      "name"      : "",
      "url"       : "",
      "version"   : "",
      "authors"   : [],
      "languages" : [],
      "categories": [],
    },
  ],
  [
    {
      "id"         : "freesm",
      "logo"       : "freesmlauncher.svg",
      "name"       : "Freesm Launcher",
      "url"        : "https://github.com/FreesmTeam/FreesmLauncher/",
      "version"    : "sequoia-1.3.0",
      "authors"    : ["windstone", "s0me1newithhand7s", "kaeeraa", "so5iso4ka"],
      "languages"  : ["eng", "rus"],
      "categories" : ["mal", "non-mal", "cosmetic", "advanced", "shit"],
      "description": "A Prism Launcher fork aimed to provide a free way to play Minecraft",
      "pages"      : ["/"],
      "unknown"    : "",
    },
    {
      "id"         : "freesm",
      "logo"       : "freesmlauncher.svg",
      "name"       : "Freesm Launcher",
      "url"        : "https://github.com/FreesmTeam/FreesmLauncher/",
      "version"    : "sequoia-1.3.0",
      "authors"    : ["windstone", "s0me1newithhand7s", "kaeeraa", "so5iso4ka"],
      "languages"  : ["eng", "rus"],
      "categories" : ["mal", "non-mal", "cosmetic", "advanced"],
      "description": "A Prism Launcher fork aimed to provide a free way to play Minecraft",
      "pages"      : ["/"],
    },
  ],
  [
    {
      "id"         : "freesm",
      "logo"       : "freesmlauncher.svg",
      "name"       : "Freesm Launcher",
      "url"        : "https://github.com/FreesmTeam/FreesmLauncher/",
      "version"    : "sequoia-1.3.0",
      "authors"    : [true, "windstone", false, "s0me1newithhand7s", "kaeeraa", "so5iso4ka"],
      "languages"  : ["eng", 123, "rus", 0],
      "categories" : ["mal", true, "non-mal", "YOO what up man", "Cosmetic", "cosmetic", "advanced", 654, "shit"],
      "description": "A Prism Launcher fork aimed to provide a free way to play Minecraft",
      "pages"      : ["/"],
      "unknown"    : "",
    },
    {
      "id"         : "freesm",
      "logo"       : "freesmlauncher.svg",
      "name"       : "Freesm Launcher",
      "url"        : "https://github.com/FreesmTeam/FreesmLauncher/",
      "version"    : "sequoia-1.3.0",
      "authors"    : ["true", "windstone", "false", "s0me1newithhand7s", "kaeeraa", "so5iso4ka"],
      "languages"  : ["eng", "123", "rus", "0"],
      "categories" : ["mal", "non-mal", "cosmetic", "advanced"],
      "description": "A Prism Launcher fork aimed to provide a free way to play Minecraft",
      "pages"      : ["/"],
    },
  ],
] as const;

for (const [input, output] of testData) {
  const testName = `Validate Manifest: ${input}`;

  test(testName, () => {
    expect(
      JSON.stringify(validateManifest(input)),
    ).toBe(
      JSON.stringify(output),
    );
  });
}

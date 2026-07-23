# pattern-collector-anyjs 🔍

> **A high-performance pattern collector and ESM import statement analyzer for JavaScript, specializing in analyzing and mapping Express router imports to their registrations.**

[![npm version](https://img.shields.io/npm/v/pattern-collector-anyjs.svg?style=flat-square&color=38bdf8)](https://www.npmjs.com/package/pattern-collector-anyjs)
[![license](https://img.shields.io/npm/l/pattern-collector-anyjs.svg?style=flat-square&color=34d399)](LICENSE)

🔗 **Quick Links:**
*   📦 **NPM Registry**: [npmjs.com/package/pattern-collector-anyjs](https://www.npmjs.com/package/pattern-collector-anyjs)
*   💻 **GitHub Repo**: [github.com/keshavsoft/pattern-collector-anyjs](https://github.com/keshavsoft/pattern-collector-anyjs)
*   🌐 **Live Documentation**: [keshavsoft.github.io/pattern-collector-anyjs](https://keshavsoft.github.io/pattern-collector-anyjs/)

---

## 📖 Overview

`pattern-collector-anyjs` is a lightweight static analysis library designed to map, analyze, and cross-reference ES module route imports against Express router registrations. It helps detect unused route imports or missing router imports in express route setup files.

---

## ⚡ Features

*   **🧩 ESM Import Extraction**: Automatically identifies and pulls ES module imports with local paths.
*   **🛣️ Router Registration Audit**: Extracts `router.use()` routes and matching variable names.
*   **🔍 Validation Checks**: Cross-references imports against usage to generate detailed reports of unused or missing declarations.
*   **📦 Extensible & Versioned**: Uses an internal folder-based versioning structure for core modules.

---

## 🔗 Dependency Chain

*   [`pattern-collector-anyjs-pull-lines`](https://www.npmjs.com/package/pattern-collector-anyjs-pull-lines) - listed in [`package.json`](package.json) as `^1.5.3`.
*   [`pattern-collector-anyjs-build-story`](https://www.npmjs.com/package/pattern-collector-anyjs-build-story) - listed in [`package.json`](package.json) as `^1.2.1`.

---

## 🚀 Installation

```bash
npm install pattern-collector-anyjs
```

---

## 🛠️ API Reference

### `default(options)`

The default export is a function that parses a router file's content and builds a registration story.

#### Parameters

An options object containing:

*   **`fileContent`** `(string)`: The raw string content of the Express routes file to parse.
*   **`parseRegex`** `(RegExp)`: Regular expression used to parse import statements and extract the router variable name (first capture group) and subfolder path (second capture group).
*   **`searchRegex`** `(RegExp)`: Regular expression used to locate ESM import lines in the content.
*   **`inShowLog`** `(boolean, optional)`: Enables logging outputs for internal steps. Defaults to `false`.
*   **`showLogStep1`** `(boolean, optional)`: Enables logging outputs for step 1 extraction details. Defaults to `false`.
*   **`showLogStep2`** `(boolean, optional)`: Enables logging outputs for step 2 extraction details. Defaults to `false`.

#### Returns

*   `(Object)`: The comparison story object containing:
    *   `importLines`: Array of ESM import statements found and parsed.
    *   `useLines`: Array of router registrations parsed from `router.use()`.
    *   `importMissInUse`: List of imports that are declared but never registered via `router.use()`.
    *   `useMissInImport`: List of registrations that do not have a matching import declaration.

---

## 💻 Usage Example

Here is how you can use `pattern-collector-anyjs` to analyze a routes file:

```javascript
import patternCollectorAnyJS from 'pattern-collector-anyjs';

const fileContent = `
import express from 'express';

import { router as routerFromv1 } from "./v1/routes.js";
import { router as routerFromv2 } from "./v2/routes.js";

const router = express.Router()

router.use("/v1", routerFromv1);

export { router };
`;

// Extract variable name & folder name from route imports
const parseRegex = /import\s*\{[^}]*router\s+as\s+(\w+)[^}]*\}\s*from\s*['"]\.\/([^/]+)\/.*['"]/;
// Match local import lines
const searchRegex = /^[ \t]*import\b.*from\s+['"]\.[^'"]*['"];/gm;

const story = patternCollectorAnyJS({
    fileContent,
    parseRegex,
    searchRegex
});

console.log(story);
```

### Output:

```json
{
  "importLines": [
    {
      "variable": "routerFromv1",
      "folderName": "v1",
      "line": "import { router as routerFromv1 } from \"./v1/routes.js\";",
      "lineNumber": 3
    },
    {
      "variable": "routerFromv2",
      "folderName": "v2",
      "line": "import { router as routerFromv2 } from \"./v2/routes.js\";",
      "lineNumber": 4
    }
  ],
  "useLines": [
    {
      "routeName": "v1",
      "variableName": "routerFromv1",
      "line": "router.use(\"/v1\", routerFromv1);",
      "lineNumber": 8
    }
  ],
  "importMissInUse": [
    {
      "variable": "routerFromv1",
      "folderName": "v1",
      "line": "import { router as routerFromv1 } from \"./v1/routes.js\";",
      "lineNumber": 3,
      "isFound": true,
      "usedLine": {
        "routeName": "v1",
        "variableName": "routerFromv1",
        "line": "router.use(\"/v1\", routerFromv1);",
        "lineNumber": 8
      }
    },
    {
      "variable": "routerFromv2",
      "folderName": "v2",
      "line": "import { router as routerFromv2 } from \"./v2/routes.js\";",
      "lineNumber": 4,
      "isFound": false,
      "usedLine": null
    }
  ],
  "useMissInImport": [
    {
      "routeName": "v1",
      "variableName": "routerFromv1",
      "line": "router.use(\"/v1\", routerFromv1);",
      "lineNumber": 8,
      "isFound": true,
      "usedLine": {
        "variable": "routerFromv1",
        "folderName": "v1",
        "line": "import { router as routerFromv1 } from \"./v1/routes.js\";",
        "lineNumber": 3
      }
    }
  ]
}
```

---

## 🧹 Cleaning Workflow Runs

To keep your GitHub Actions dashboard clean and free of old runs, you can delete them in bulk using the included utility script:

1. Run the script:
   ```bash
   node clean-runs.js
   ```
2. Paste your GitHub **Personal Access Token (PAT)** with `actions:write` (or `repo`) permissions when prompted.

---

## ⚖️ License

MIT License. Designed with ❤️ by [KeshavSoft](https://github.com/keshavsoft).


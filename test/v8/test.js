import fs from 'fs';
import path from 'path';

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appJsPath = path.join(__dirname, "routes.js");

import defaultFunc from '../../index.js';

import extractRegex from './extractRegex.js';

const fileContent = fs.readFileSync(appJsPath, 'utf8');

const k1 = defaultFunc({
    fileContent,
    extractRegex,
    showLog: {
        keysOnly: false,
        withValues: false
    },
    showLogStep1: {
        keysOnly: false,
        withValues: false
    },
    showLogStep2: {
        keysOnly: false,
        withValues: false
    }
});

// console.log("ssssssssss : ", k1);
console.log("ssssssssss : ", Object.keys(k1), k1.summary);

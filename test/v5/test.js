import fs from 'fs';
import path from 'path';

import defaultFunc from '../../index.js';

import extractRegex from './extractRegex.js';

const filePath = path.join(process.cwd(), "routes.js");

const fileContent = fs.readFileSync(filePath, 'utf8');

const k1 = defaultFunc({
    fileContent,
    extractRegex,
    showLog: false,
    showLogStep1: false,
    showLogStep2: false
});

console.log("ssssssssss : ", k1);


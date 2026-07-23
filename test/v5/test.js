import fs from 'fs';
import path from 'path';

import defaultFunc from '../../index.js';

const filePath = path.join(process.cwd(), "routes.js");

const fileContent = fs.readFileSync(filePath, 'utf8');

const regexPath = path.join(process.cwd(), "extractRegex.json");
const extractRegex = JSON.parse(fs.readFileSync(regexPath, 'utf8'));

const k1 = defaultFunc({
    fileContent,
    extractRegex,
    showLog: false,
    showLogStep1: false
});

console.log("ssssssssss : ", k1);


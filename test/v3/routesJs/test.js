import fs from 'fs';
import path from 'path';

import defaultFunc from '../../../index.js';

const filePath = path.join(process.cwd(), "routes.js");

const fileContent = fs.readFileSync(filePath, 'utf8');

const parseRegex = /import\s*\{[^}]*router\s+as\s+(\w+)[^}]*\}\s*from\s*['"]\.\/([^/]+)\/.*['"]/;

const searchString = /^[ \t]*import\b.*from\s+['"]\.[^'"]*['"];/gm;

const k1 = defaultFunc({
    fileContent, parseRegex, searchRegex: searchString,
    inShowLog: false,
    showLogStep1: false, showLogStep2: false
});

console.log("ssssssssss : ", k1);


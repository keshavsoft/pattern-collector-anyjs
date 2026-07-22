import fs from 'fs';
import path from 'path';

import pullImportLines from "pattern-collector-routesjs-pull-lines";
import buildStory from "pattern-collector-routesjs-build-story";

const parseRegex = /import\s*\{[^}]*router\s+as\s+(\w+)[^}]*\}\s*from\s*['"]\.\/([^/]+)\/.*['"]/;

const startFunc = ({ inFilePath, inShowLog, showLogStep1, showLogStep2 }) => {
    const filePath = path.join(inFilePath, "routes.js");

    const fileContent = fs.readFileSync(filePath, 'utf8');

    const { importLines, useLines } = pullImportLines({
        fileContent,
        parseRegex,
        showLog: showLogStep1,
        showLogStep1: showLogStep2
    });

    if (inShowLog) console.log("pullImportLines : ", importLines, useLines);

    const story = buildStory({ importLines, useLines });

    if (inShowLog) console.log("story : ", story);
    // console.log("aaaaaaaa : ", JSON.stringify(story, null, 4));

    return story;
};

export default startFunc;
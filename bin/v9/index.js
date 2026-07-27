import pullDifferentLines from "pattern-collector-anyjs-pull-lines";
import buildStory from "pattern-collector-anyjs-build-story";

import packageJson from '../../package.json' with {type: 'json'};

import atStart from "./showLogs/atStart.js";
import afterPullDifferentLines from "./showLogs/afterPullDifferentLines.js";
import atEnd from "./showLogs/atEnd.js";

// convertToRegExp converts regex strings to native RegExp objects.
// This is necessary to support configurations loaded from JSON files,
// where regular expressions cannot be stored natively and must be defined as strings.
const convertToRegExp = (regexObj) => {
    if (!regexObj) return regexObj;
    const result = { ...regexObj };
    if (typeof result.parseRegex === 'string') {
        result.parseRegex = new RegExp(result.parseRegex);
    }
    if (typeof result.searchRegex === 'string') {
        result.searchRegex = new RegExp(result.searchRegex, 'gm');
    }
    if (typeof result.searchString === 'string') {
        result.searchString = new RegExp(result.searchString, 'gm');
    }
    return result;
};

const startFunc = ({ fileContent, extractRegex, showLog,
    showLogStep1, showLogStep2 }) => {

    atStart({ packageJson, showLog, fileContent, extractRegex });

    const importRegex = convertToRegExp(extractRegex.importRegex);
    const consumptionRegex = convertToRegExp(extractRegex.consumptionRegex);
    const exportRegex = convertToRegExp(extractRegex.exportRegex);
    const importNpmRegex = convertToRegExp(extractRegex.importNpmRegex);

    const { importLines, useLines, allLines, exportLines, importLinesFromNpm } = pullDifferentLines({
        fileContent,
        importRegex,
        consumptionRegex, exportRegex,
        importNpmRegex,
        showLog: showLogStep1,
        showLogStep1: showLogStep2
    });

    afterPullDifferentLines({ packageJson, showLog, importLines, useLines, allLines, exportLines, importLinesFromNpm });

    const story = buildStory({ importLines, useLines, allLines, exportLines, importLinesFromNpm });

    atEnd({ packageJson, showLog, story });

    return story;
};

export default startFunc;
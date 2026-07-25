import pullImportLines from "pattern-collector-anyjs-pull-lines";
import buildStory from "pattern-collector-anyjs-build-story";

import packageJson from '../../package.json' with {type: 'json'};

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

    if (showLog?.keysOnly) console.log(`${packageJson.name}-start`);
    if (showLog?.withValues) console.log(`${packageJson.name}-inputs-fileContent : `, fileContent);
    if (showLog?.withValues) console.log(`${packageJson.name}-inputs-extractRegex : `, extractRegex);

    const importRegex = convertToRegExp(extractRegex.importRegex);
    const consumptionRegex = convertToRegExp(extractRegex.consumptionRegex);

    const { importLines, useLines, allLines } = pullImportLines({
        fileContent,
        importRegex,
        consumptionRegex,
        showLog: showLogStep1,
        showLogStep1: showLogStep2
    });

    if (showLog?.withValues) console.log(`${packageJson.name}-pullImportLines-importLines: : `, importLines);
    if (showLog?.withValues) console.log(`${packageJson.name}-pullImportLines-useLines: : `, useLines);
    if (showLog?.withValues) console.log(`${packageJson.name}-pullImportLines-allLines: : `, allLines);
    // console.log(`${packageJson.name}-pullImportLines-allLines: : `, allLines);

    const story = buildStory({ importLines, useLines, allLines });

    // if (inShowLog) console.log("story : ", story);
    // console.log("aaaaaaaa : ", JSON.stringify(story, null, 4));
    if (showLog?.keysOnly) console.log(`${packageJson.name}-end`);
    if (showLog?.withValues) console.log(`${packageJson.name}-outputs-story: : `, story);
    if (showLog?.withValues) console.log(`${packageJson.name}-outputs-allLinesWithStory: : `, allLinesWithStory);

    return story;
};

export default startFunc;
import pullImportLines from "pattern-collector-anyjs-pull-lines";
import buildStory from "pattern-collector-routesjs-build-story";

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

const startFunc = ({ fileContent, extractRegex, inShowLog,
    showLogStep1, showLogStep2 }) => {

    const importRegex = convertToRegExp(extractRegex.importRegex);
    const consumptionRegex = convertToRegExp(extractRegex.consumptionRegex);

    const { importLines, useLines } = pullImportLines({
        fileContent,
        importRegex,
        consumptionRegex,
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
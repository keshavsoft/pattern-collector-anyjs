import pullImportLines from "pattern-collector-anyjs-pull-lines";
import buildStory from "pattern-collector-routesjs-build-story";

const startFunc = ({ fileContent, extractRegex, inShowLog,
    showLogStep1, showLogStep2 }) => {

    const { importLines, useLines } = pullImportLines({
        fileContent,
        importRegex: extractRegex.importRegex,
        consumptionRegex: extractRegex.consumptionRegex,
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
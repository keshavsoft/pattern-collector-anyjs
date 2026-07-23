import pullImportLines from "pattern-collector-anyjs-pull-lines";
import buildStory from "pattern-collector-routesjs-build-story";

const startFunc = ({ fileContent, parseRegex,
    inShowLog, showLogStep1, showLogStep2 }) => {

    const { importLines, useLines } = pullImportLines({
        fileContent,
        parseRegex,
        showLog: showLogStep1,
        showLogStep1: showLogStep2
    });

    if (inShowLog) console.log("pullImportLines : ", importLines, useLines);

    const story = buildStory({ importLines, useLines });

    if (inShowLog) console.log("story : ", story);

    return story;
};

export default startFunc;
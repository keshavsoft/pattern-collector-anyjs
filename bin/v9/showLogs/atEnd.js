const startFunc = ({
    packageJson, showLog, importLines, useLines, allLines, exportLines, importLinesFromNpm
}) => {

    if (showLog?.keysOnly) console.log(`${packageJson.name}-afterPullDifferentLines`);
    if (showLog?.withValues) console.log(`${packageJson.name}-outputs : `, importLines);
    if (showLog?.withValues) console.log(`${packageJson.name}-outputs : `, useLines);
    if (showLog?.withValues) console.log(`${packageJson.name}-outputs : `, allLines);
    if (showLog?.withValues) console.log(`${packageJson.name}-outputs : `, exportLines);
    if (showLog?.withValues) console.log(`${packageJson.name}-outputs : `, importLinesFromNpm);

};

export default startFunc;
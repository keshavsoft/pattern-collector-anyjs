const startFunc = ({
    packageJson, showLog, story
}) => {

    if (showLog?.keysOnly) console.log(`${packageJson.name}-end`);
    if (showLog?.withValues) console.log(`${packageJson.name}-outputs : `, story);

};

export default startFunc;
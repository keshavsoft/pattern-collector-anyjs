const startFunc = ({
    packageJson, showLog, fileContent, extractRegex
}) => {
    if (showLog?.keysOnly) console.log(`${packageJson.name}-start`);
    if (showLog?.withValues) console.log(`${packageJson.name}-inputs-fileContent : `, fileContent);
    if (showLog?.withValues) console.log(`${packageJson.name}-inputs-extractRegex : `, extractRegex);
};

export default startFunc;
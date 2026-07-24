export default {
    importRegex: {
        parseRegex: /import\s*\{[^}]*router\s+as\s+(\w+)[^}]*\}\s*from\s*['"]\.\/([^/]+)\/.*['"]/,
        searchRegex: /^[ \t]*import\b.*from\s+['"]\.[^'"]*['"];/gm
    },
    consumptionRegex: {
        parseRegex: /router\.use\s*\(\s*['"`]\/?([^'"`]+)['"`]\s*,\s*(\w+)/,
        searchRegex: /^[ \t]*router\.use\b.*?;/gm
    }
};

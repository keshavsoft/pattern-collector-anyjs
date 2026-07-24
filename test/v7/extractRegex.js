export default {
    importRegex: {
        parseRegex: /import\s*\{[^}]*router\s+as\s+(\w+)[^}]*\}\s*from\s*['"]\.\/([^/]+)\/.*['"]/,
        searchString: /^[ \t]*import\b.*from\s+['"]\.[^'"]*['"];/gm
    },
    consumptionRegex: {
        parseRegex: /router\.use\s*\(\s*['"`]\/?([^'"`]+)['"`]\s*,\s*(\w+)/,
        searchString: /^[ \t]*router\.use\b.*?;/gm
    }
};

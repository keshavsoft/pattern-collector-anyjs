export default {
    fromEndPointsJs: {
        importNpmRegex: {
            searchRegex: /^[ \t]*import\b.*from\s+['"](?:(?!\.{1,2}\/|\/)[^'"]+)['"]\s*;?/gm
        },
        importRegex: {
            parseRegex: /import\s+(\w+)\s+from\s*['"]\.\/([^/]+)\/controller\.js['"]/,
            searchRegex: /^[ \t]*import\b.*from\s+['"]\.\/[^'"]+\/controller\.js['"]\s*;?/gm
        },
        consumptionRegex: {
            parseRegex1: /router\.(get|post|put|delete|patch)\s*\(\s*['"]([^'"]+)['"].*?\b(\w+)\s*\(/,
            parseRegex: /router\.\w+\(\s*['"]\/?([^'"]+)['"][\s\S]*?\b(funcFrom\w+)\s*\(/,
            parseRegex2: /router\.\w+\(\s*['"]([^'"]+)['"][\s\S]*?\b(funcFrom\w+)\s*\(/,
            parseRegex3: /router\.(get|post|put|delete|patch)\(\s*['"]\/?([^'"]+)['"][\s\S]*?\b(funcFrom\w+)\s*\(/,
            searchRegex: /^[ \t]*router\.(?:get|post|put|delete|patch)\b.*;?/gm
        },
        exportRegex: {
            searchRegex: /export\s*\{\s*(\w+)\s*\}\s*;?/gm
        }
    },
    fromRoutesJs: {
        importNpmRegex: {
            searchRegex: /^[ \t]*import\b.*from\s+['"](?!\.{1,2}\/|\/)[^'"]+['"];/gm
        },
        importRegex: {
            parseRegex: /import\s*\{[^}]*router\s+as\s+(\w+)[^}]*\}\s*from\s*['"]\.\/([^/]+)\/.*['"]/,
            searchRegex: /^[ \t]*import\b.*from\s+['"]\.[^'"]*['"];/gm
        },
        consumptionRegex: {
            parseRegex: /router\.use\s*\(\s*['"`]\/?([^'"`]+)['"`]\s*,\s*(\w+)/,
            searchRegex: /^[ \t]*router\.use\b.*?;/gm
        },
        exportRegex: {
            searchRegex: /export\s*\{\s*(\w+)\s*\}\s*;?/gm
        }
    },
    fromAppJs: {
        importNpmRegex: {
            searchRegex: /^[ \t]*import\b.*from\s+['"](?!\.{1,2}\/|\/)[^'"]+['"];/gm
        },
        importRegex: {
            parseRegex: /import\s*\{[^}]*router\s+as\s+(\w+)[^}]*\}\s*from\s*['"]\.\/([^/]+)\/.*['"]/,
            searchRegex: /^[ \t]*import\b.*from\s+['"]\.[^'"]*['"];/gm
        },
        consumptionRegex: {
            parseRegex: /router\.use\s*\(\s*['"`]\/?([^'"`]+)['"`]\s*,\s*(\w+)/,
            searchRegex: /^[ \t]*router\.use\b.*?;/gm
        },
        exportRegex: {
            searchRegex: /export\s*\{\s*(\w+)\s*\}\s*;?/gm
        }
    }
};

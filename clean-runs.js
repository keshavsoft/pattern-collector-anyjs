import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
    console.log("=== GitHub Actions Workflow Runs Cleaner ===");
    
    // Check if token exists in environment, otherwise prompt for it
    const token = process.env.GITHUB_TOKEN || await question("Enter your GitHub Personal Access Token (PAT) with actions:write scope: ");
    if (!token) {
        console.error("Error: GitHub Token is required.");
        rl.close();
        return;
    }

    const owner = "keshavsoft";
    const repo = "pattern-collector-anyjs";

    console.log(`\nFetching workflow runs for ${owner}/${repo}...`);

    try {
        const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=100`;
        const response = await fetch(url, {
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${token}`,
                "X-GitHub-Api-Version": "2022-11-28",
                "User-Agent": "NodeJS-Fetch"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch runs: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const runs = data.workflow_runs || [];

        if (runs.length === 0) {
            console.log("No workflow runs found.");
            rl.close();
            return;
        }

        console.log(`Found ${runs.length} workflow runs. Starting deletion...`);

        for (const run of runs) {
            const deleteUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run.id}`;
            const delRes = await fetch(deleteUrl, {
                method: "DELETE",
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `Bearer ${token}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                    "User-Agent": "NodeJS-Fetch"
                }
            });

            if (delRes.status === 204) {
                console.log(`✅ Deleted run #${run.run_number} (ID: ${run.id}) - Event: ${run.event} (${run.name})`);
            } else {
                console.warn(`❌ Failed to delete run #${run.run_number} (ID: ${run.id}). Status: ${delRes.status}`);
            }
        }

        console.log("\nCleanup completed successfully!");
    } catch (error) {
        console.error("An error occurred:", error.message);
    } finally {
        rl.close();
    }
}

main();

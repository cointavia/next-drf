import { spawn } from "child_process";
import chalk from "chalk";

const backendDir = "drf-backend";

const appName = process.argv[2]; // Accept app name as a command-line argument

if (!appName) {
    console.error(chalk.red("\n❌ Please specify the app name.\nUsage: npm run startapp <app_name>"));
    process.exit(1);
}

console.log(chalk.green(`\n🚀 Creating a new Django app: ${appName}...\n`));

const command = process.platform === "win32"
    ? `cd ${backendDir} && env\\Scripts\\python manage.py startapp ${appName}`
    : `cd ${backendDir} && ./env/bin/python manage.py startapp ${appName}`;

const processApp = spawn(command, {
    shell: true,
    stdio: "inherit",
});

processApp.on("close", (code) => {
    if (code === 0) {
        console.log(chalk.green(`\n✅ Successfully created the app "${appName}" in ${backendDir}/`));
    } else {
        console.error(chalk.red(`\n❌ Failed to create the app "${appName}".`));
    }
});

import { spawn } from "child_process";
import chalk from "chalk";

// Function to run a command using spawn
function runNpmCommand(scriptName) {
  return new Promise((resolve, reject) => {
    console.log(chalk.blueBright(`Running command: npm run ${scriptName}`));

    const childProcess = spawn("npm", ["run", scriptName], {
      stdio: "inherit", // Forward logs directly to the terminal
      shell: true,      // Use shell for npm commands
      env: process.env, // Pass environment variables
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command "npm run ${scriptName}" failed with exit code ${code}`));
      }
    });

    childProcess.on("error", (err) => {
      console.error(chalk.red(`Error running "npm run ${scriptName}": ${err.message}`));
      reject(err);
    });
  });
}

// Main script
(async () => {
  try {
    console.log(chalk.green("---------------------------------------------------"));
    console.log(chalk.blueBright("       🚀 Running Backend Migrations...          "));
    console.log(chalk.green("---------------------------------------------------"));

    // Run makemigrations and migrate commands
    await runNpmCommand("dev:makemigrations");
    await runNpmCommand("dev:migrate");

    console.log(chalk.green("\n✅ Migrations completed successfully!"));
  } catch (err) {
    console.error(chalk.red("\n❌ Migration failed: "), err.message);
    process.exit(1);
  }
})();

#!/usr/bin/env node
import { execSync } from "child_process";
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";

console.log(chalk.green("Welcome to Next-DRF CLI! 🚀 by Cointavia"));

const QUESTIONS = [
  {
    name: "projectName",
    type: "input",
    message: "Enter your project name:",
    default: "my-next-drf-project",
  },
];

async function createProject() {
  const answers = await inquirer.prompt(QUESTIONS);
  const projectName = answers.projectName;

  // Clone the template
  console.log(chalk.blue("\nCloning the Next-DRF template..."));
  execSync(`git clone https://github.com/your-repo/next-drf.git ${projectName}`, {
    stdio: "inherit",
  });

  // Navigate to the project
  process.chdir(projectName);

  // Remove Git history from the template
  fs.rmSync(path.join(process.cwd(), ".git"), { recursive: true, force: true });

  console.log(chalk.blue("\nInstalling dependencies..."));
  execSync("npm install", { stdio: "inherit" });

  console.log(chalk.green("\n✅ Project setup complete!"));
  console.log(chalk.yellow(`\nNext steps:`));
  console.log(chalk.cyan(`cd ${projectName}`));
  console.log(chalk.cyan(`npm run dev`));
}

createProject();

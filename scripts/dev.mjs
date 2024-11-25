import { spawn } from "child_process";
import chalk from "chalk";

let frontendReady = false;
let backendReady = false;

// Ensure this is the main script
if (process.argv[1].endsWith("dev.mjs")) {
  // Clear the console for better readability
  console.clear();

  // Welcome Message
  console.log(chalk.green("---------------------------------------------------"));
  console.log(chalk.blueBright("       🚀 Welcome to NEXT-DRF Development!        "));
  console.log(chalk.green("---------------------------------------------------"));
  console.log(chalk.cyan("Frontend: ") + chalk.yellow("http://localhost:3000"));
  console.log(chalk.cyan("Backend:  ") + chalk.yellow("http://localhost:8000"));
  console.log(chalk.green("---------------------------------------------------"));
  console.log(chalk.magenta("Starting development servers...\n"));
}

// Function to display the post-start message
function checkServersReady() {
  if (frontendReady && backendReady) {
    console.log(chalk.green("\n✅ All servers are running successfully!"));
    console.log(chalk.cyan("🌐 Open your browser at http://localhost:3000 to view the landing page!"));
    console.log(chalk.cyan("📡 API server is running at http://127.0.0.1:8000"));
    console.log(chalk.green("---------------------------------------------------"));
  }
}

// Start the frontend server
const frontend = spawn("npm", ["run", "dev:frontend"], {
  stdio: "inherit",
  shell: true,
  stdio: "pipe", env: process.env
});

// Start the backend server
const backend = spawn("npm", ["run", "dev:backend"], {
  stdio: ["inherit", "pipe", "pipe"],
  shell: true,
  env: process.env
});


// Handle frontend output
frontend.stdout.on("data", (data) => {
  const message = data.toString().trim();
  console.log("frontend ready")
  // console.log(message)
  process.stdout.write(chalk.blueBright(`[Frontend]: ${message}\n`)); // Log output
  if (message.includes("Ready")) {
    frontendReady = true;
    console.log(frontendReady)
    console.log(backendReady)
    checkServersReady();
  }
});

// Handle backend output (stdout)
backend.stdout.on("data", (data) => {
  const message = data.toString().trim();
  console.log(chalk.green(`[Backend]: ${message}`)); // Log backend output
  if (message.includes("Starting development server")) {
    backendReady = true;
    console.log(frontendReady)
    console.log(backendReady)
    checkServersReady();
  }
});

// Handle backend errors (stderr)
backend.stderr.on("data", (data) => {
  const message = data.toString().trim();
  console.error(chalk.red(`[Backend Error]: ${message}`));
});


// Handle frontend errors
frontend.on("error", (err) => {
  console.error(chalk.red(`Frontend Error: ${err.message}`));
});

// Handle backend errors
backend.on("error", (err) => {
  console.error(chalk.red(`Backend Error: ${err.message}`));
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log(chalk.red("\nShutting down development servers..."));
  frontend.kill();
  backend.kill();
  process.exit();
});

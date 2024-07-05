const express = require("express");
const consign = require("consign");
const path = require("path");
const fs = require("fs");

const PORT = 3000;
const app = express();

app.set("json spaces", 4);

// Define the directory paths
const __dirname = path.resolve();
// const __filename = path.resolve(__dirname, "index.js"); // Assuming this script is located at the project root

const folderPath = path.join(__dirname, "uploads/images"); // Replace 'uploads/images' with your folder name

// Check if the directory exists, create it if not
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
  console.log(`Folder created.`);
} else {
  console.log(`Folder already exists.`);
}

// Serve static files from the uploads/images directory
app.use("/uploads/images", express.static(folderPath));

consign({ verbose: false })
  .include("libs/config.js")
  .then("db.js")
  .then("auth.js")
  .then("libs/middlewares.js")
  .then("routes")
  .then("libs/boot.js")
  .into(app);

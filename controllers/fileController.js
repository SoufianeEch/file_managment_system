const fs = require("fs");
const path = require("path");
const db = require("../config/db");

const UPLOAD_DIR = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

async function uploadFile(filePath) {
  if (!fs.existsSync(filePath)) throw new Error("File does not exist");

  const fileName = Date.now() + "_" + path.basename(filePath);
  const destPath = path.join(UPLOAD_DIR, fileName);

  // Copy file to uploads folder
  fs.copyFileSync(filePath, destPath);

  // Insert into DB
  const [result] = await db.query(
    "INSERT INTO Files (name, path) VALUES (?, ?)",
    [fileName, destPath]
  );

  return { id: result.insertId, name: fileName, path: destPath };
}

module.exports = { uploadFile };

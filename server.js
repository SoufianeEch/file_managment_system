require("dotenv").config();
const express = require("express");
const { uploadFile } = require("./controllers/fileController")

const app = express();
const PORT = process.env.PORT || 3000;

// Simple test route
app.get("/upload", async (req, res) => {
  try {
    const result = await uploadFile(".gitignore"); // pass path to file
    res.json(result); // send response back to client
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

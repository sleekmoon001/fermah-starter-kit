const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS so frontend can call this backend
app.use(cors());
app.use(express.json()); // built-in body parser

// Define your /prove endpoint
app.post("/prove", (req, res) => {
  const { input } = req.body;
  console.log("Received request:", input);
  res.json({
    proof: { dummy: true },
    publicSignals: [input],
  });
});

// <-- Paste this at the very end of index.js
const PORT = process.env.PORT || 3001; // Render assigns a dynamic port
app.listen(PORT, () => {
  console.log(`Prover server listening on port ${PORT}`);
});



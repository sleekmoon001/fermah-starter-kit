// prover-server/index.js
const express = require("express");
const cors = require("cors"); // <-- add cors
const app = express();

// Use Render-assigned port or fallback to 3001
const PORT = process.env.PORT || 3001;

// Enable CORS so frontend can call this backend
app.use(cors());
app.use(express.json()); // built-in body parser

app.post("/prove", (req, res) => {
  const { input } = req.body;
  console.log("Received request:", input);
  res.json({
    proof: { dummy: true },
    publicSignals: [input],
  });
});

app.listen(PORT, () => {
  console.log(`Prover server listening on port ${PORT}`);
});


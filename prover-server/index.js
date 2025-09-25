const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Prover server listening on port ${PORT}`);
});


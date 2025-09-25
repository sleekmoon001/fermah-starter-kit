// prover-server/index.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/prove", (req, res) => {
  const { input } = req.body;
  res.json({
    proof: { dummy: true },
    publicSignals: [input],
  });
});

app.listen(3001, () => {
  console.log("Prover server listening on port 3001");
});

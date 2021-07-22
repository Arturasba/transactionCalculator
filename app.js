const commissioning = require("./routes/comissioning");
const express = require("express");
const app = express();
app.use(express.json());
const config = require("./config");

app.post("/", commissioning.receiveCommission);

app.listen(config.app.port, () => {
  console.log(
    `Transaction app listening at http://localhost:${config.app.port}`
  );
});

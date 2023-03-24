const express = require("express");

const PORT_NUMBER = 8080;

const app = express();

app.get("/echo", (req, res) => {
  const message = req.query.message;
  debugger;
  res.send(message);
});

app.get("/snacks", (req, res) => {
  const search = req.query.search;
  const available_snacks = ["apple", "cheese", "cracker", "lunchmeat", "olive"];
  for (const snack of available_snacks) {
    if (snack === search) {
      res.send(`yes, we have ${search}s!\n`);
      return;
    }
  }
  res.send(`sorry, we don't have any ${search}s :(\n`);
});

app.listen(PORT_NUMBER, "0.0.0.0", () => {
  console.log(`app started on port ${PORT_NUMBER}`);
});

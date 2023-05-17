const express = require("express");

const app = express();

// The port on which the Microservice runs
const PORT = 3002;

// Assigning the routes to the "/" URI
const homeRouter = require("./routes/home");
app.use("/", homeRouter);

// Assigning the routes to the "/cnv" URI
const cnvRouter = require("./routes/cnv");
app.use("/cnv", cnvRouter);

app.listen(PORT, () => {
  console.log(`Microservice available at: http://localhost:${PORT}/`);
});

const express = require("express");
const bodyParser = require('body-parser');

const app = express();

// The port on which the Microservice runs
const PORT = 3000;

app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '50mb' }));

// Assigning the routes to the "/" URI
const homeRouter = require("./routes/home");
app.use("/", homeRouter);

// Assigning the routes to the "/cnv" URI
const convRouter = require("./routes/conv");
app.use("/conv", convRouter);

app.listen(PORT, () => {
  console.log(`Microservice available at: http://localhost:${PORT}/`);
});

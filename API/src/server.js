require("dotenv").config();
const express = require("express");
const client = require("prom-client");
const helmet = require("helmet");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const { logging } = require("./helper/logging");
const { connectMysql } = require("./database/connectMysql");
const v1Route = require("./routes/v1Route/v1Route");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(errorHandler);

app.get("/matrics", (req, res) => {
  const register = new client.Registry();
  register.setDefaultLabels({ app: "art_gallery" });
  client.collectDefaultMetrics({ register });
  res.setHeader("Content-Type", register.contentType);

  register.metrics().then((data) => res.status(200).send(data));
});
app.get("/error", (req, res, next) => {
  const error = new Error("Something went wrong!");
  error.status = 500;
  next(error); // Forward the error to the error handler
});
app.use("/api/v1", v1Route);
(async function () {
  try {
    await connectMysql.authenticate();
    logging.info("Connection to database has been established successfully.");
  } catch (error) {
    logging.error("Unable to connect to the database:", error);
  }
})();
app.use(errorHandler);
connectMysql.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    logging.info(`connection done successifuly on local host on port ${PORT}`);
    console.log(`connection done successifuly on local host on port ${PORT}`);
  });
});

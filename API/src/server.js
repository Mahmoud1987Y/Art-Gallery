require("dotenv").config();
const express = require("express");
const client = require("prom-client");
const helmet = require("helmet");
const cors = require("cors");
const { logging } = require("./helper/logging");
const { connectMysql } = require("./database/connectMysql");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(helmet());
app.use(express.json());
app.get("/matrics", async (req, res) => {
  const register = new client.Registry();
  register.setDefaultLabels({ app: "art_gallery" });
  client.collectDefaultMetrics({ register });
  res.setHeader("Content-Type", register.contentType);

  register.metrics().then((data) => res.status(200).send(data));
});
(async function () {
  try {
    await connectMysql.authenticate();
    logging.info("Connection to database has been established successfully.");
  } catch (error) {
    logging.error("Unable to connect to the database:", error);
  }
})();

connectMysql.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    logging.info(`connection done successifuly on local host on port ${PORT}`);
    console.log(`connection done successifuly on local host on port ${PORT}`);
  });
});

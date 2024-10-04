require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { logging } = require("./helper/logging");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(helmet());
app.use(express.json());

app.listen(PORT, () => {
  logging.info(`connection done successifuly on local host on port ${PORT}`);
  console.log(`connection done successifuly on local host on port ${PORT}`);
});

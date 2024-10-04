require("dotenv").config();
const winston = require("winston");

exports.logging = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports:
    process.env.NODE_ENV !== "production"
      ? [
          new winston.transports.File({
            filename: "app_log.txt",
            level: "info",
          }),
          new winston.transports.File({
            filename: "app_log_error",
            level: "error",
          }),
          new winston.transports.Console({ format: winston.format.simple() }),
        ]
      : [
          new winston.transports.File({
            filename: "app_log.txt",
            level: "info",
          }),
          new winston.transports.File({
            filename: "app_log_error",
            level: "error",
          }),
        ],
});

const express = require("express");
const app = express();
const users = [];

app.use(express.json())

module.exports = app;
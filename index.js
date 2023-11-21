const dotenv = require("dotenv");
const http = require("http");
const express = require("express");
const cors = require("cors");

// DB connection
require("./config/dbConnection");

// config
dotenv.config();
const app = express();

// Port
const PORT = process.env.PORT || 3001;

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// create server
const server = http.createServer(app);

// listen server
server.listen(PORT, () => {
  console.log(`server is running on http://172.16.0.210:${PORT}`);
});

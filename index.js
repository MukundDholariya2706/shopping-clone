const dotenv = require("dotenv");
const http = require("http");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const swagger = require("swagger-ui-express");
const rootRouter = require("./routes/route");
const swaggerDocument = require("./swagger/swagger.index");

// DB connection
require("./config/dbConnection");

// config
dotenv.config();
const app = express();

// Port
const PORT = process.env.PORT || 3001;
const URL = process.env.URL || '172.16.0.210';

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));

// swagger UI
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));

// Other root
app.use(rootRouter);

// create server
const server = http.createServer(app);

// listen server
server.listen(PORT, () => {
  console.log(`server is running on http://${URL}:${PORT}`);
});

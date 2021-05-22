"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const config = require("config");
const mongoose=require("mongoose");

const appConfig = config.get("appConfig");

const PORT = process.env.PORT || 8080;
const app = express();

console.log("NODE_ENV: " + config.util.getEnv("NODE_ENV"));
console.log("appConfig: " + appConfig.config);

// bring in routes
const voterRoutes=require("./src/routes/voter");
const candidateRoutes=require("./src/routes/candidate");
const universalRoutes=require("./src/routes/universal");
const partyRoutes=require("./src/routes/party");
const electionRoutes=require("./src/routes/election");
const voteRoutes=require("./src/routes/vote");
const adminRoutes=require("./src/routes/admin");

// middleware
app.use(morgan("dev"));

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(helmet({ contentSecurityPolicy: false }));

app.set("trust proxy", 1);

// mongoose.Promise = global.Promise;
  
mongoose.connect(appConfig.databases.mongoDB.url, { useNewUrlParser : true, 
useUnifiedTopology: true,useFindAndModify:false }, function(error) {
    if (error) {
        console.log("Error!" + error);
      }else{
      console.log("Successfully connected to MongoDB")
    }
});

// routes in use
app.use("/api/v1/party",partyRoutes);
app.use("/api/v1/voter", voterRoutes);
app.use("/api/v1/candidate", candidateRoutes);
app.use("/api/v1/election",electionRoutes);
app.use("/api/v1/vote",voteRoutes);
app.use("/api/v1/admin",adminRoutes);
app.use("/api/v1/", universalRoutes);

// Internal Server Errors
app.use((err, req, res, next) => {
  console.log("Internal Server Error", err);
  console.log("Caused by req", req.body);
  return res.status(500).send(err);
});

app.all("*", (req, res, next) => {
  return res.status(404).json({ error: "Invalid route" });
});

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});


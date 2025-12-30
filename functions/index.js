const functions = require("firebase-functions");
const express = require("express");
const authRoutes = require("./routes/auth");
const assist = require("./routes/assistance");
const route = require("./routes/routes");
const fastag = require("./routes/fastag");
const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/routes", routeRoutes);
app.use("/assistance", assistanceRoutes);
app.use("/fastag", fastagRoutes);
exports.api = functions
.region("asia-south1")
.https.onRequest(app);
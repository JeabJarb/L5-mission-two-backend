// ========== Module IMPORTS ========== //
const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// ========== ROUTE IMPORTS ========== //
const vehiclesRouter = require("./routes/vehiclesRoutes");
const riskRatingRouter = require("./routes/riskRatingRoutes");
const quoteRouter = require("./routes/quoteRouters");

// Create API ENDPOINTS HERE!!!
// ROOT ENDPOINT

app.get("/", (req, res) => {
  res.send("The backend is functioning!");
});

app.use("/api/vehicle", vehiclesRouter);

// Car Value Endpoint
app.use(customersRouter);

// Risk Rating Endpoint
app.use("/api/claims", riskRatingRouter);

// Insurance Quote Endpoint
app.use("/api/quotes", quoteRouter);

// Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on "http://localhost:${PORT}"`);
});

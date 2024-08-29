const express = require("express");
const riskRatingRouter = express.Router();
const riskRatingController = require("../controllers/riskRatingControllers");

riskRatingRouter.post("/", riskRatingController.riskRatingController);

module.exports = riskRatingRouter;

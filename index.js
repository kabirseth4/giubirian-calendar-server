const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const serverPort = process.env.PORT;
const publicHolidayData = require("./data/public-holidays.json");
const recurringHolidayData = require("./data/recurring-holidays.json");

app.use(cors());
app.use(express.json());

app.get("/public-holidays", (_req, res) => {
  res.json(publicHolidayData);
});

app.get("/public-holidays/region/:regionId", (req, res) => {
  const { regionId } = req.params;

  const regionData = publicHolidayData[regionId];

  if (!regionData) {
    res.status(404).json("Region not found.");
    return;
  }
  res.json(regionData);
});

app.get("/recurring-holidays", (_req, res) => {
  res.json(recurringHolidayData);
});

app.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}`);
});

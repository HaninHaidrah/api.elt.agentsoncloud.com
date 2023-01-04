const express = require("express");
const historyRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */

const {
  createHistoryFile,
  getHistoryFiles,
  updateFileHistory,
  deleteFileHistory,
} = require("../../routers/controllers/history");

///////////////////////////////////////////////// created by user  //////////////////////////////////////////////////////

historyRoute.post("/addHistoryFile", createHistoryFile);
historyRoute.post("/getHistoryFiles", getHistoryFiles);
historyRoute.post("/updateHistoryFile", updateFileHistory);
historyRoute.post("/deleteHistoryFile", deleteFileHistory);
// templateRoute.post("/createNotificationByEvent", createNotificationByEvent);
// templateRoute.post(
//   "/createNotificationFromTemplate",
//   createNotificationByTemplateId
// );

////////////////////////////////////////////////  reassign    ////////////////////////////////////////////////////////

/// exports
module.exports = historyRoute;

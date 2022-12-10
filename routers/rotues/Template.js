const express = require("express");
const templateRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */

const {
  createEdTemplate,
  getEdTemplates,
  updateEdTemplate,deleteEdTemplate
} = require("../../routers/controllers/edt");

///////////////////////////////////////////////// created by user  //////////////////////////////////////////////////////

templateRoute.post("/addEdTemplate", createEdTemplate);
templateRoute.post("/getEdTemplates", getEdTemplates);
templateRoute.post("/updateEdTemplate", updateEdTemplate);
templateRoute.post("/deleteEdTemplate", deleteEdTemplate);
// templateRoute.post("/createNotificationByEvent", createNotificationByEvent);
// templateRoute.post(
//   "/createNotificationFromTemplate",
//   createNotificationByTemplateId
// );

////////////////////////////////////////////////  reassign    ////////////////////////////////////////////////////////

/// exports
module.exports = templateRoute;

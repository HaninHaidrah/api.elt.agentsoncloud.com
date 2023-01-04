const { sequelize } = require("../../models/index");
const { Op } = require("sequelize");
const uuid = require("uuid");
const axios = require("axios");
// const { requestRebuilder } = require("../../plugins/axsios");
const {
  wherINJSON,
  whereINDataType,
  arrayOfIds,
} = require("../services/shared/jsonBuilders");
const {
  createHistoryRecord,
  updateHistoryFileRecord,
} = require("../services/history");

const createHistoryFile = async (req, res) => {
  try {
    // in this function we take the body details  for  create new Template record
    let { name, path, template, transactionId, country, createdBy } = req.body;
    let defaultCountry = "JOD";
    if (!country) country = defaultCountry;
    const id = `ETL-EGH-${country}-${uuid.v4()}`;
    if (!transactionId) transactionId = `TRN-ETL-EGH-${country}-${uuid.v4()}`;
    const templateDTO = {
      id,
      name,
      path,
      template,
      transactionId,
      country,
      createdBy,
    };

    const newRecord = await createHistoryRecord(templateDTO);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getHistoryFiles = async (req, res) => {
  try {
    let {
      ids,
      body,
      name,
      language,
      templateId,
      orderCondition,
      limit,
      offset,
      path,
    } = req.body;
    let response = [];

    if (limit && offset) {
      limit = limit * 1;
      offset = offset * 1 - 1;
      const record = await sequelize.models.EGH.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.and]: [
            ids ? arrayOfIds("id", ids) : "",
            name ? wherINJSON("name", "like", `${language}`, name) : "",
            body?.length
              ? body.map((el) => {
                  return wherINJSON(
                    "template",
                    "like",
                    `body.${el.key}`,
                    el.value
                  );
                })
              : "",
            templateId ? wherINJSON("template", "eq", `id`, templateId) : "",
            path ? whereINDataType("path", "like", path) : "",
          ],
          recordStatus: "LATEST",
        },
        order: orderCondition
          ? [[`${orderCondition}`, "DESC"]]
          : [["createdAt", "ASC"]],
      });

      response.push({
        pages: Math.ceil(record.count / limit),
        ...record,
      });
    } else {
      response = await sequelize.models.EGH.findAndCountAll({
        where: {
          [Op.and]: [
            ids ? arrayOfIds("id", ids) : "",
            name ? wherINJSON("name", "like", `${language}`, name) : "",
            body?.length
              ? body.map((el) => {
                  return wherINJSON(
                    "template",
                    "eq",
                    `body.${el.key}`,
                    el.value
                  );
                })
              : "",
            templateId ? wherINJSON("template", "eq", `id`, templateId) : "",

            path ? whereINDataType("path", "like", path) : "",
          ],
          recordStatus: "LATEST",
        },
        order: orderCondition
          ? [[`${orderCondition}`, "DESC"]]
          : [["createdAt", "ASC"]],
      });
    }

    res.status(200).send(response);
  } catch (error) {
    res.status(402).send(error.message);
  }
};

const updateFileHistory = async (req, res) => {
  try {
    let { id, name, template, path, createdBy, createdAt, transactionId } =
      req.body;
    // we need to get the notifcation we need to update it
    const oldRecord = await sequelize.models.EGH.findOne({
      where: {
        id,
        recordStatus: "LATEST",
      },
    });
    // now i will update the recordStatus for the record to UPDATED
    const updateRecored = await updateHistoryFileRecord(
      oldRecord.id,
      "UPDATED"
    );
    let DTO = {
      name: name ? name : oldRecord.name,
      template: template ? template : oldRecord.template,
      path: path ? path : oldRecord.path,
      createdBy: createdBy ? createdBy : oldRecord.createdBy,
      createdAt: createdAt ? createdAt : oldRecord.createdAt,
      transactionId: transactionId ? transactionId : oldRecord.transactionId,
      id: id ? id : oldRecord.id,
    };
    const newRecord = await createHistoryRecord(DTO);
    res.status(200).json(newRecord);
  } catch (error) {
    res.status(402).send({ error: error.message });
  }
};

const deleteFileHistory = async (req, res) => {
  try {
    const { id } = req.body;

    await updateHistoryFileRecord(id, "DELETED");

    const record = await sequelize.models.EGH.findOne({
      where: { id, recordStatus: "DELETED" },
    });
    res.status(200).json(record);
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = {
  createHistoryFile,
  getHistoryFiles,
  updateFileHistory,
  deleteFileHistory,
};

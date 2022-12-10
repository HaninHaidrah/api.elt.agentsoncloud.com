const { sequelize } = require("../../models/index");
const { Op } = require("sequelize");
const uuid = require("uuid");
const axios = require("axios");
// const { requestRebuilder } = require("../../plugins/axsios");
const {
  wherINJSON,
  whereINDataType,
  arrayOfIds,
} = require("../../routers/services/shared/jsonBuilders");
const {
  createTemplateRecord,
  updateEdTemplateRecord,
} = require("../services/template");

const createEdTemplate = async (req, res) => {
  try {
    // in this function we take the body details  for  create new Template record
    let { name, description, body, transactionId, country, createdBy } =
      req.body;
    let defaultCountry = "JOD";
    if (!country) country = defaultCountry;
    const id = `ETL-EDT-${country}-${uuid.v4()}`;
    if (!transactionId) transactionId = `TRN-ETL-EDT-${country}-${uuid.v4()}`;
    const templateDTO = {
      id,
      body,
      name,
      description,
      transactionId,
      createdBy,
    };

    const newRecord = await createTemplateRecord(templateDTO);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getEdTemplates = async (req, res) => {
  try {
    let {
      ids,
      status,
      body,
      name,
      language,
      description,
      orderCondition,
      limit,
      offset,
    } = req.body;
    let response = [];

    if (limit && offset) {
      limit = limit * 1;
      offset = offset * 1 - 1;
      const record = await sequelize.models.EDT.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.and]: [
            ids ? arrayOfIds("id", ids) : "",
            status !== undefined ? whereINDataType("status", "eq", status) : "",
            name ? wherINJSON("name", "like", `${language}`, name) : "",
            description
              ? wherINJSON(
                  "description",
                  "like",
                  `description[${language}]`,
                  description
                )
              : "",
            body?.length
              ? body.map((el) => {
                  wherINJSON("body", "like", `${el.key}`, el.value);
                })
              : "",
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
      response = await sequelize.models.EDT.findAndCountAll({
        where: {
          [Op.and]: [
            ids ? arrayOfIds("id", ids) : "",
            status !== undefined ? whereINDataType("status", "eq", status) : "",
            name ? wherINJSON("name", "like", `${language}`, name) : "",
            description
              ? wherINJSON(
                  "description",
                  "like",
                  `description[${language}]`,
                  description
                )
              : "",
            body?.length
              ? body.map((el) => {
                  return wherINJSON("body", "like", `${el.key}`, el.value);
                })
              : "",
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

const updateEdTemplate = async (req, res) => {
  try {
    let {
      id,
      name,
      description,
      body,
      status,
      createdBy,
      createdAt,
      transactionId,
    } = req.body;
    // we need to get the notifcation we need to update it
    const oldRecord = await sequelize.models.EDT.findOne({
      where: {
        id,
        recordStatus: "LATEST",
      },
    });
    // now i will update the recordStatus for the record to UPDATED
    const updateRecored = await updateEdTemplateRecord(oldRecord.id, "UPDATED");
    let DTO = {
      name: name ? name : oldRecord.name,
      description: description ? description : oldRecord.description,
      body: body ? body : oldRecord.body,
      status: status ? status : oldRecord.status,
      createdBy: createdBy ? createdBy : oldRecord.createdBy,
      createdAt: createdAt ? createdAt : oldRecord.createdAt,
      transactionId: transactionId ? transactionId : oldRecord.transactionId,
      id: id ? id : oldRecord.id,
    };
    const newRecord = await createTemplateRecord(DTO);
    res.status(200).json(newRecord);
  } catch (error) {
    res.status(402).send({ error: error.message });
  }
};

const deleteEdTemplate = async (req, res) => {
  try {
    const { id } = req.body;

    await updateEdTemplateRecord(id, "DELETED");

    const record = await sequelize.models.EDT.findOne({
      where: { id, recordStatus: "DELETED" },
    });
    res.status(200).json(record);
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = {
  createEdTemplate,
  getEdTemplates,
  updateEdTemplate,deleteEdTemplate
};

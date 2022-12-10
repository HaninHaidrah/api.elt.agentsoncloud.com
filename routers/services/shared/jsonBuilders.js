const uuid = require("uuid");
const { sequelize } = require("../../../models/index");
const { Op } = require("sequelize");

const arrayOfIds = (key, array) => {
  // this function to return where condition when i need it includes value in array
  return {
    [key]: {
      [Op.in]: array,
    },
  };
};

const wherJSONId = (key, value) => {
  // this function to return where condition if i do search based in id (lockup) in Json format
  return sequelize.where(
    sequelize.fn("JSON_VALUE", sequelize.col(key), sequelize.literal(`"$.id"`)),
    Op.eq,
    `${value}`
  );
};
const whereINDataType = (key, operationName, value) => {
  // this function to return where condition when i need it includes value in array
  if (operationName === "like") value = `%${value}%`;
  return {
    [key]: {
      [Op[operationName]]: value,
    },
  };
};
const whereBetween = (key, value) => {
  // this function to return where condition between to values
  return {
    [key]: {
      [Op.between]: [value[0], value[1]],
    },
  };
};

const wherINJSON = (key, operationName, path, value) => {
  // this function to return where condition if i do search based in any key and any path in Json format
  if (operationName === "like") value = `%${value}%`;
  return sequelize.where(
    // sequelize.fn("lower", sequelize.col(key)),

    sequelize.fn(
      "JSON_VALUE",
      sequelize.col(key),
      sequelize.literal(`"$.${path}"`)
    ),
    {
      [Op[operationName]]: value,
    }
  );
};

module.exports = {
  whereBetween,
  wherJSONId,
  arrayOfIds,
  wherINJSON,
  whereINDataType,
};

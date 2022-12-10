const { sequelize } = require("../../models/index");

const createTemplateRecord = async (templateDTO) => {
  try {
    // console.log(templateDTO)
    return await sequelize.models.EDT.create(templateDTO);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// to update notifications status:
const updateEdTemplateRecord = async (id, status) => {
  try {
    return await sequelize.models.EDT.update(
      {
        recordStatus: `${status}`,
      },
      {
        where: { id: id, recordStatus: "LATEST" },
      }
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTemplateRecord,
  updateEdTemplateRecord,
};

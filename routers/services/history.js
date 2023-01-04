const { sequelize } = require("../../models/index");

const createHistoryRecord = async (templateDTO) => {
  try {
    // console.log(templateDTO)
    return await sequelize.models.EGH.create(templateDTO);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// to update notifications status:
const updateHistoryFileRecord = async (id, status) => {
  try {
    return await sequelize.models.EGH.update(
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
  createHistoryRecord,
  updateHistoryFileRecord,
};

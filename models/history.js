"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EGH extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EGH.init(
    {
      seq: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        Initial: 1000000,
      },
      id: {
        type: DataTypes.STRING,
        defaultValue: "ETL-EGH-JOR-XXX-XXX-XXX",
        allowNull: false,
      },
      name: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      template: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recordStatus: {
        type: DataTypes.ENUM("LATEST", "UPDATED", "DELETED"),
        defaultValue: "LATEST",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdBy: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      transactionId: {
        type: DataTypes.STRING,
        defaultValue: "TRN-EGH-EGH-JOR-XXX-XXX-XXX",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "EGH",
      initialAutoIncrement: 1000000,
      tableName: "ETL_TT_Generated_File_History",
      underscored: true,
      freezeTableName: true,
      updatedAt: false,
    }
  );
  return EGH;
};

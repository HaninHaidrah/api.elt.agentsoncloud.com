"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EDT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EDT.init(
    {
      seq: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        Initial: 1000000,
      },
      id: {
        type: DataTypes.STRING,
        defaultValue: "ETL-EDT-JOR-XXX-XXX-XXX",
        allowNull: false,
      },

      description: {
        type: DataTypes.JSON,
      },
      name: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      body: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
        allowNull: false,
        defaultValue: "ACTIVE",
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
        defaultValue: "TRN-ETL-EDT-JOR-XXX-XXX-XXX",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "EDT",
      initialAutoIncrement: 1000000,
      tableName: "ETL_MT_File_Template",
      underscored: true,
      freezeTableName: true,
      updatedAt: false,
    }
  );
  return EDT;
};

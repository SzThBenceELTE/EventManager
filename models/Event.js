const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const EventEnum = require('../enums/EventEnum');

module.exports = sequelize.define(
  'Event',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM(EventEnum),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    maxParticipants: {
      type: DataTypes.INTEGER,
    },

  },
  {
    validate: {
      dateValidation() {
        if (this.startDate > this.endDate) {
          throw new Error('End date must be greater than start date.');
        }
      }
    }
  }
);
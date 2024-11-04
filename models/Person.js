const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const RoleEnum = require('../enums/RoleEnum');
const GroupEnum = require('../enums/GroupEnum');



module.exports = sequelize.define(
    'Person',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      surnameName: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM(RoleEnum),
        allowNull: false,
      },
      group: {
        type: DataTypes.ENUM(GroupEnum),
        allowNull: true,
      },
      
    },
    {
      validate: {
        groupRoleValidation() {
          if (this.role === 'DEVELOPER' && !this.group) {
            throw new Error('Group must be specified if the role is Developer.');
          }
          if (this.role !== 'DEVELOPER' && this.group) {
            throw new Error('Group can only be specified if the role is Developer.');
          }
        }
      }
    }
  );
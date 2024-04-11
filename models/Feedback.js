const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Feedback extends Model {}

Feedback.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        coffee_shop_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'coffeeshop',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'feedback'
    }

);

module.exports = Feedback;
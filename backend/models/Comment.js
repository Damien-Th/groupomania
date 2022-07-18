const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');

const Comment = connection.define('Comment', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },

}, { timestamps: true, deletedAt: false, paranoid: false} )

module.exports = Comment

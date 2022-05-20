const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');

const Comment = connection.define('Comment', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(120),
        allowNull: true
    }
   
}, { paranoid: true} )

module.exports = Comment
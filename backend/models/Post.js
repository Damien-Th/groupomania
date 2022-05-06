const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');

const Post = connection.define('Post', {
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
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(120),
        allowNull: true
    },
    likes: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
    },
   
}, { paranoid: true} )

module.exports = Post
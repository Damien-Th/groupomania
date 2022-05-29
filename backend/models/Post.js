const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');
const User = require('./User');

const Post = connection.define('Post', {
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
    image: {
        type: DataTypes.STRING(120),
        allowNull: true
    }
   
}, { paranoid: true } );


module.exports = Post
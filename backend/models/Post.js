const { DataTypes } = require('sequelize');
const connection = require('../connection');

const Post = connection.define('Post', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING(120),
        allowNull: true,
    },
    
}, { timestamps: true, deletedAt: false, paranoid: false } );


module.exports = Post
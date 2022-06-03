const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');

const Like = connection.define('Like', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM({
            values: ['Post', 'Comment'],
            allowNull: false
          })
    },
    type_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
   
}, { timestamps: false, paranoid: true} )

module.exports = Like
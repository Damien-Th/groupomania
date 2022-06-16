const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');

const User = connection.define('User', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        is: /^[0-9a-z]+$/i
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: ''
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: ''
    },
    user_img: {
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: ''
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { timestamps: false, paranoid: true } );


module.exports = User
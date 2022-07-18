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
        is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: 'default.jpg'
        
    },
    biography : {
        type: DataTypes.TEXT('tiny'),
        allowNull: true,
    },
    slug : {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { timestamps: false, deletedAt: false, paranoid: true } );


module.exports = User
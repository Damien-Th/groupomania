const {Sequelize} = require('sequelize');
const mysql = require("mysql2");

require('dotenv').config()

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const ENV = process.env.ENV;

if(ENV === 'development') {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
      });
    
    connection.query(
        `CREATE DATABASE IF NOT EXISTS groupomania`,
        function (err, results) {
          if(results) console.log(results);
          if(err) console.log(err);
        }
      );
}

const sequelize = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
    host: `${DB_HOST}`,
    dialect: 'mysql',
});

if(ENV === 'development') {
  sequelize.sync(err => {
      console.log('Database Sync Error', err)
  })
}

module.exports = sequelize
global.sequelize = sequelize
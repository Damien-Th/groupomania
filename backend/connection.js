const {Sequelize} = require('sequelize');

require('dotenv').config()

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const ENV = process.env.ENV;

const sequelize = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
    host: `${DB_HOST}`,
    dialect: 'mysql',
});

if(ENV === 'development') {
  sequelize.sync(err => {
      console.log('Database Sync Error', err)
  })
}

sequelize.authenticate()
  .then(() => {console.log('Connection has been established successfully.')})
  .catch(err => {console.error('Unable to connect to the database:', err)});

module.exports = sequelize
global.sequelize = sequelize
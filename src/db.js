const Sequelize = require('sequelize')
require('dotenv/config')
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env
const TaskModel = require('./models/task')

const sequelize = new Sequelize( DB_USER, DB_NAME, DB_PASSWORD,{
    host: DB_HOST,
    dialect: 'mysql'
})

const TaskMod = TaskModel(sequelize)

sequelize.sync({force:false})


module.exports = {TaskMod}
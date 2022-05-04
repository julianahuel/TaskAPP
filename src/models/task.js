const {DataTypes} = require('sequelize')

module.exports = (sequelize)=>{
    return sequelize.define('task',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
            unique:true
        },
        title:{
            type: DataTypes.STRING,
            unique: true
        },
        description:{
            type: DataTypes.STRING
        }
    },{
        timestamps: false
    })
}
const {TaskMod} = require('../db');

const getTasks = async (req, res, next)=>{
    try{

        let tasks = await TaskMod.findAll()
        res.status(200).json(tasks)

    }catch(err){next(err)}
}

const getTaskById = async (req, res, next)=>{
    try{

        const {id} = req.params
        const find = await TaskMod.findByPk(id)

        if(find === null)return res.status(404).json({message: "Task not found"})
        res.status(200).json(find)

    }catch(err){next(err)}
}

const createTask = async (req, res, next)=>{
    try{

        const {title, description} = req.body
        const task = await TaskMod.create({
            title, description
        })
        res.status(200).json(task)

    }catch(err) { 
        // console.log(err.errors)
        res.status(400)
        next(err)
    }
}

const deleteTask = async (req, res, next)=>{

    try{

        const {id} = req.params
        const task = await TaskMod.findByPk(id)
        if(task){
            await TaskMod.destroy({
                where:{
                    id: id
                }
            })
            console.log(task)
            return res.status(200).json({status: "Deleted", task: task})
        }
        res.status(404).json({message: "Task not found"})

    }catch(err){next(err)}
}

const updateTask = async (req, res, next)=>{
    try{
        // throw new Error('Salio mal')
        const {id} = req.params
        let {title, description} = req.body
        const task = await TaskMod.findOne({
            where: {
                id: id
            }
        })
        // console.log(task.title)
        if(task) {
            if(title == '') title = task.title
            if(description == '') description = task.description
            TaskMod.update({title: title, description: description}, { where: {id:id}})
            return res.status(200).json({status:"edited", taskUpdated: task, update: req.body})
        }
        
        res.status(400).json({message:"Error to edit"})
        
    }catch(err){
        console.log(err)
        next(err)}
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask
};
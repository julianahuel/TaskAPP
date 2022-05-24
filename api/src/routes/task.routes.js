const {Router} = require('express')
const router = Router()
const {getTasks, getTaskById, createTask, deleteTask, updateTask} = require('../controllers/task.controller')

router.get('/', getTasks)

router.get('/:id', getTaskById)

router.post('/', createTask)

router.delete('/:id', deleteTask)

router.put('/:id', updateTask)

module.exports = router
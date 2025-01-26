const express = require('express')
const routes = express.Router()
const {
  GetAlltasks,
  GetsingleTask,
  Updatetask,
  Deletetask,
  CreateTask,
} = require('../controller/task.js')

routes.get('/', GetAlltasks)
routes.post('/', CreateTask)

routes.get('/:id', GetsingleTask)
routes.patch('/:id', Updatetask)
routes.delete('/:id', Deletetask)
module.exports = routes

const Task = require('../../model/task.js')

const GetAlltasks = async (req, res) => {
  try {
    const task = await Task.find()
    if (!task || task.length === 0) {
      return res.status(404).json({ msg: 'Element dosent exist' })
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: 'server error' })
  }
}

const GetsingleTask = async (req, res) => {
  const { id } = req.params

  try {
    const task = await Task.findOne({ _id: id })
    if (!task) {
      return res.status(404).json({ msg: 'Element dosent exist' })
    }
    res.status(200).json({ name: task.name, id })
  } catch (error) {
    res.status(500).json({ msg: 'server error' })
  }
}

const Updatetask = async (req, res) => {
  const { id } = req.params
  try {
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return res.status(404).json({ msg: 'Not found' })
    }
    // Send the updated task as the response
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: 'Server error' })
  }
}

const Deletetask = async (req, res) => {
  const { id } = req.params
  try {
    const task = await Task.findByIdAndDelete({ _id: id })
    if (!task || task.length === 0) {
      return res.status(404).json({ msg: 'Task not found' })
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(400).json({ msg: 'server error' })
  }
}

const CreateTask = async (req, res) => {
  try {
    const task = Task(req.body)
    await task.save()
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  GetAlltasks,
  GetsingleTask,
  Updatetask,
  Deletetask,
  CreateTask,
}

const api_url = 'http://localhost:3000/api/v1/tasks'

// Function to get task ID from URL
const getTaskIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('id') // Extract the "id" parameter
}

// Function to fetch the task data
const fetchTaskData = async (id) => {
  try {
    const response = await fetch(`${api_url}/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch task data')
    }
    const { task } = await response.json()
    return task
  } catch (error) {
    console.error('Error fetching task data:', error)
  }
}

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const { name } = req.body

    // Find and update the task in the database (assuming you're using a DB like MongoDB)
    const task = await Task.findByIdAndUpdate(taskId, { name }, { new: true })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    // Send the updated task as response
    res.status(200).json({ task })
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Main logic to handle page functionality
const main = async () => {
  const taskId = getTaskIdFromUrl()
  if (!taskId) {
    alert('Task ID not found in the URL')
    return
  }

  // Fetch task data and pre-fill input field
  const task = await fetchTaskData(taskId)
  if (task) {
    const taskInput = document.getElementById('task-name')
    taskInput.value = task.name
  }

  // Attach event listener to the "Update" button
  const updateButton = document.getElementById('update-button')
  updateButton.addEventListener('click', () => {
    const updatedName = document.getElementById('task-name').value.trim()
    if (updatedName === '') {
      alert('Task name cannot be empty!')
      return
    }
    updateTask(taskId, updatedName)
  })
}

// Run the main function on page load
main()
